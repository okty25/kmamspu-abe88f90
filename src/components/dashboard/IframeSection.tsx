
import React from "react";
import EmbeddedFrame from "./EmbeddedFrame";

const IframeSection = () => {
  const swingAppUrl = "https://www.swing2app.com/maker_view/app-preview?appId=f0e8f296-1501-4cae-9b24-ff38f3b8836d";

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Kandungan</h2>
      <div className="mb-8">
        <EmbeddedFrame 
          url={swingAppUrl} 
          title="Aplikasi KMAM SPU" 
          onUrlChange={() => {}} 
        />
      </div>
    </>
  );
};

export default IframeSection;
