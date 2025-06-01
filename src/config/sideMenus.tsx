import { Home, TaskSquare, Chart1, Cardano, DirectInbox, Setting2 } from "iconsax-react";

export const sideMenus = [
  {
    name: "Dashboard",
    svgUrl: <Home size="31" color="#FF8A65" />,
    path: "/dashboard",
  },
  {
    name: "Tasks",
    svgUrl: <TaskSquare size="31" color="#FF8A65" />,
    path: "/dashboard/tasks",
  },
  {
    name: "Report",
    svgUrl: <Chart1 size="31" color="#FF8A65" />,
    path: "/dashboard/report",
  },
  {
    name: "Insight",
    svgUrl: <Cardano size="31" color="#FF8A65" />,
    path: "/dashboard/insight",
  },
  {
    name: "Inbox",
    svgUrl: <DirectInbox size="31" color="#FF8A65" />,
    path: "/dashboard/inbox",
  },
  {
    name: "Settings",
    svgUrl: <Setting2 size="31" color="#FF8A65" />,
    path: "/dashboard/settings",
  },
];
