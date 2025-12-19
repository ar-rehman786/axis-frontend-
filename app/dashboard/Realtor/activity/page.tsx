import { ActivityAISummary } from "@/components/activity/ActivityAISummary";
import { ActivityHeader } from "@/components/activity/ActivityHeader";
import { ActivityTable } from "@/components/activity/ActivityTable";
import data from "@/data/activity.json";

const page = () => {
  return (
    <div className="p-15">
      <ActivityHeader />
      <ActivityAISummary />
      <ActivityTable />
    </div>
  );
};

export default page;
