import React from "react";
import CardHorizontalScrollEconomicPackagePanel from "./CardHorizontalScrollEconomicPackagePanel";
import Box from "../Ui/Box";
import { H } from "../Ui/H";

function HorizontalScrollEconomicPackagePanel({
  listEconomicPackage,
  setGetListEconomicStatus,
}: {
  listEconomicPackage: TGetEconomicPackages;
  setGetListEconomicStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <Box variant="primary">
        <H size={3}>لیست پک ها</H>
      </Box>
      <div className="flex flex-col gap-2">
        {listEconomicPackage.map((val) => (
          <CardHorizontalScrollEconomicPackagePanel
            key={val.economic_package_id}
            setGetListEconomicStatus={setGetListEconomicStatus}
            prop={val}
          />
        ))}
      </div>
    </div>
  );
}

export default HorizontalScrollEconomicPackagePanel;
