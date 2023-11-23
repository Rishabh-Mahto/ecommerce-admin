import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b></b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={"#"} alt="" className="w-6 h-6" />
          <span className="px-2"></span>
        </div>
      </div>
    </Layout>
  );
}
