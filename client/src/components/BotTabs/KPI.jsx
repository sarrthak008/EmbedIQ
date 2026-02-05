

const KPI= ({ title, value }) =>{
  return (
    <div className="bg-white border border-gray-400 rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl text-gray-700 font-semibold mt-1">{value}</p>
    </div>
  );
}

export default KPI