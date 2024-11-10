import { Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import UserFeed from "./feed/UserFeed";
import DoubtsFeed from "./doubts/DoubtsFeed";

const FeedMain = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Stack margin={"auto"} width={"100%"} maxWidth={"600px"}>
      <Tabs value={activeTab} onChange={(_, n) => setActiveTab(n)} sx={{my:2}}>
        <Tab value={0} label="Feed" />
        <Tab value={1} label="Doubts" />
      </Tabs>
      {activeTab === 0 && <UserFeed />}
      {activeTab === 1 && <DoubtsFeed />}
    </Stack>
  );
};

export default FeedMain;
