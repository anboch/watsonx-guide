import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientName, internalCode, additionalContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Generating briefing for client: ${clientName}`);

    const systemPrompt = `You are an IBM Sales Intelligence assistant that generates comprehensive client briefings. 
You must return a valid JSON object with detailed, realistic information based on the company name and context provided.

The JSON structure must be:
{
  "crmData": {
    "contactName": "string",
    "contactEmail": "string",
    "contactTitle": "string",
    "pastInteractions": [
      {
        "date": "string (YYYY-MM-DD)",
        "type": "string (Meeting|Email|Conference)",
        "summary": "string"
      }
    ],
    "accountStatus": "string",
    "lastContactDate": "string (YYYY-MM-DD)",
    "accountOwner": "string",
    "region": "string"
  },
  "companyInfo": {
    "industry": "string",
    "companySize": "string",
    "headquarters": "string",
    "revenue": "string",
    "founded": "string"
  },
  "summary": "string (2-3 paragraphs describing the company)",
  "context": "string (2-3 paragraphs about their strategic situation)",
  "opportunities": [
    {
      "title": "string",
      "description": "string",
      "date": "string"
    }
  ],
  "painPoints": ["string"],
  "solutionMapping": [
    {
      "product": "string (IBM watsonx product name)",
      "compatibility": number (0-100),
      "shortDescription": "string",
      "reason": "string",
      "whyInteresting": "string",
      "whyNotInteresting": "string",
      "useCases": ["string"]
    }
  ],
  "keyQuestions": ["string"],
  "competitiveIntel": {
    "competitors": ["string"],
    "insights": ["string"]
  },
  "nextSteps": ["string"],
  "references": [
    {
      "id": number,
      "text": "string (source description like 'Company Website - About Page', 'Q4 2024 Earnings Report', 'Industry Analysis Report 2024')",
      "url": "string (realistic URL)"
    }
  ]
}

CRITICAL: Add reference citations throughout the content using [ref:X] format where X is the reference ID number.
For example: "The company reported $5.2B in revenue [ref:1] and plans to expand into AI [ref:2]."

Generate realistic, detailed information with 8-12 references from various sources (company website, earnings reports, industry publications, news articles, analyst reports).
Include at least 6-8 IBM watsonx solution options in solutionMapping with varying compatibility scores (55-95).`;

    const userPrompt = `Generate a comprehensive sales briefing for:
Company: ${clientName}
Internal Code: ${internalCode}
${additionalContext ? `Additional Context: ${additionalContext}` : ''}

Provide detailed, realistic information about this company including their industry, challenges, and how IBM watsonx solutions can help them. Include at least 6-8 IBM watsonx solution options.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log("Raw AI response:", content);
    
    // Extract JSON from the response (handle markdown code blocks)
    let briefingData;
    try {
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      briefingData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      throw new Error("Failed to parse AI response as JSON");
    }

    console.log("Successfully generated briefing");

    return new Response(
      JSON.stringify({ briefing: briefingData }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generate-briefing function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
