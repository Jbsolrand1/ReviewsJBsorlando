
export const handler = async () => {
  const token = process.env.NETLIFY_API_TOKEN;
  const formId = process.env.NETLIFY_FORM_ID;
  if(!token || !formId){
    return { statusCode: 500, body: JSON.stringify({error: "Missing NETLIFY_API_TOKEN or NETLIFY_FORM_ID"}) };
  }
  try{
    const resp = await fetch(`https://api.netlify.com/api/v1/forms/${formId}/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if(!resp.ok){
      return { statusCode: 500, body: JSON.stringify({error:"Netlify API error", status: resp.status}) };
    }
    const subs = await resp.json();
    const items = subs
      .map(s => {
        const data = s.data || {};
        const rating = Number(data.rating || 0);
        const consent = (data.consent || "").toString();
        return {
          id: s.id,
          created_at: s.created_at,
          name: (data.name || "").toString().slice(0, 50),
          trip: (data.trip || "").toString(),
          rating,
          best: (data.best || "").toString(),
          improve: (data.improve || "").toString(),
          consent
        };
      })
      .filter(r => (r.consent.toLowerCase().startsWith("sí") || r.consent.toLowerCase().startsWith("yes")) && r.rating >= 4)
      .sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4);
    return { statusCode: 200, headers: {"Content-Type":"application/json","Cache-Control":"no-store"}, body: JSON.stringify(items) };
  }catch(e){
    return { statusCode: 500, body: JSON.stringify({error: e.message}) };
  }
};
