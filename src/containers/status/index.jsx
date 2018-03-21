import React from "react";
import Content from "../../components/content";

const Status = () => (
    <Content>
        <code>{JSON.stringify({ running: true }, null, 2)}</code>
    </Content>
);

export default Status;
