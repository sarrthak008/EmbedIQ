import { toast } from "sonner";


const EmbedTab = ({ botId })=> {

  const copyCDN = async () => {
    const cdn = `<script 
  src="https://cdn.jsdelivr.net/gh/sarrthak008/EmbedIQ@main/cdn/enbedIq.js" 
  data-bot-id="${botId}">
</script>`;

    try {
      await navigator.clipboard.writeText(cdn);
      toast.success("CDN copied to clipboard!");
    } catch (error) {
      toast.error(error.message || "Failed to copy to clipboard");
    }
  };


  return (
    <div className="bg-white border-gray-400 border rounded-xl p-6 space-y-4 text-sm">
      <p>Embed this bot on your website using the script below:</p>

      <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-x-auto">
        {`<script 
    src="https://cdn.jsdelivr.net/gh/sarrthak008/EmbedIQ@main/cdn/enbedIq.js" 
    data-bot-id="${botId}">
</script>`}
      </pre>

      <button onClick={() => copyCDN()} className="px-4 py-2 bg-black text-white rounded-md">
        Copy Embed Code
      </button>
    </div>
  );
}


export default EmbedTab