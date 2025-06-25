import React, { useEffect, useState } from "react";
import Scripts from "../../shared/utils/clientScripts";
import RequestsPanel from "../RequestsPanel";
import MyTaskPanel from "../MyTaskPanel";
import GroupTaskPanel from "../GroupTaskPanel";
import { IncomingCall } from "../IncomingCall/IncomingCall";
import Loader from "../../../UIKit/Loader/Loader";

function WorkTable() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    Scripts.OnInit().then(() => {
      setIsInitializing(false);
    });
  }, []);

  return (
    <>
      {isInitializing && (
        <div className="medpult-work-table-loader">
          <Loader />
        </div>
      )}
      {!isInitializing && (
        <div className="medpult-work-table">
          <IncomingCall />
          <RequestsPanel />
          <MyTaskPanel />
          <GroupTaskPanel />
        </div>
      )}
    </>
  );
}
export default WorkTable;
