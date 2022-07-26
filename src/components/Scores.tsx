import { useContext } from "react";
import { Table, Tag } from "antd";
import { AppContext } from "../store/appContext";
import { GAME_TYPES } from "../models/constants";

const columns = [
  {
    title: "Frame #",
    dataIndex: "frame",
    key: "frame"
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    render: (score: number, { frameThrows }: { frameThrows: string }) =>
      frameThrows ? (
        <span>
          {score} ({frameThrows})
        </span>
      ) : (
        score
      )
  },
  {
    title: "",
    dataIndex: "desc",
    key: "desc",
    render: (desc: string | null) =>
      desc ? (
        <Tag color={desc === GAME_TYPES.STRIKE ? "green" : "magenta"}>
          {desc}
        </Tag>
      ) : null
  }
];

const Scores = () => {
  const { scoresByFrame, currentScore } = useContext(AppContext);
  return (
    <div className="score-block">
      <div className="title">
        Total Score: <strong>{currentScore}</strong>
      </div>
      {scoresByFrame && scoresByFrame.length ? (
        <div className="scoreTable">
          <Table
            columns={columns}
            dataSource={scoresByFrame}
            pagination={false}
            size="small"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Scores;
