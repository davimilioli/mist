import { ReactNode } from "react";
import { TabsContent } from "../ui/tabs";

type Props = {
    value: string;
    children: ReactNode;
}

const ForecastTabContent = ({ value, children }: Props) => {
    return (
        <TabsContent value={value} className="mt-0 outline-none">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {children}
          </div>
        </TabsContent>
    )
}

export default ForecastTabContent;