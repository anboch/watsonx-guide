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
  "companyInfo": {
    "name": "string",
    "industry": "string",
    "size": "string",
    "location": "string"
  },
  "executiveSummary": "string (2-3 paragraphs)",
  "crmData": {
    "accountOwner": "string",
    "lastInteraction": "string (date)",
    "currentStatus": "string",
    "totalValue": "string"
  },
  "opportunityIntelligence": [
    {
      "title": "string",
      "description": "string",
      "priority": "High" | "Medium" | "Low",
      "estimatedValue": "string"
    }
  ],
  "painPoints": [
    {
      "category": "string",
      "description": "string",
      "impact": "High" | "Medium" | "Low"
    }
  ],
  "solutions": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "compatibility": number (0-100),
      "benefits": ["string"],
      "implementation": "string"
    }
  ],
  "keyQuestions": ["string"],
  "competitiveIntelligence": {
    "currentVendors": ["string"],
    "competitiveAdvantages": ["string"],
    "risks": ["string"]
  },
  "nextSteps": [
    {
      "action": "string",
      "timeline": "string",
      "owner": "string"
    }
  ],
  "pastInteractions": [
    {
      "date": "string",
      "type": "string",
      "summary": "string"
    }
  ]
}

Generate realistic, detailed information. Use specific IBM watsonx products in the solutions section.`;

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
