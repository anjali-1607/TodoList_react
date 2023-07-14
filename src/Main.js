import React, { useState } from "react";

import {
  Button,
  Segment,
  Table,
  TextArea,
  Form,
  Divider,
} from "semantic-ui-react";

import { info } from "./InfoApi";

export default function Main() {
  const [todaData, setTodoData] = useState(info);
  const [data, setData] = useState({ id: null, schedule: "", time: "" });
  // const [id, setId] = useState(null);

  const onsubmit = () => {
    if (data.id !== null) {
      const newData = todaData.map((ele, idx) =>
        idx === data.id
          ? { ...ele, schedule: data.schedule, time: data.time }
          : ele
      );
      // console.log("NewData" + newData);

      setTodoData(newData);
      console.log(newData);
      console.log(data);
      console.log(setTodoData);
    } else {
      console.log(data);

      setTodoData([...todaData, data]);
    }
    setData({ id: null, schedule: "", time: {} });
  };

  function cancel(i) {
    const updatedTable = todaData.filter((ele, idx) => {
      return i != idx;
    });
    setTodoData(updatedTable);
  }

  function edit(i) {
    const editTable = todaData.filter((ele, idx) => {
      return idx === i;
    });
    console.log(editTable);
    setData({ ...todaData[i], id: i });
    console.log("setdata", setData);
  }
  console.log("Hello", data);

  const arrangeTime = (t) => {
    const time = t;
    const splittedTime = time.split(":");
    const AmOrPm = splittedTime[0] >= 12 ? "PM" : "AM";
    const hours = splittedTime[0] % 12 || 12;
    const finalTime = hours + ":" + splittedTime[1] + " " + AmOrPm;
    return finalTime;
    // console.log(finalTime);
  };
  console.log(todaData);

  return (
    <>
      <Segment style={{ boxShadow: "none", border: "0" }}>
        {" "}
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            fontSize: "30px",
            fontFamily: "apple",
            fontWeight: "bold",
          }}>
          {" "}
          TODO LIST{" "}
        </div>{" "}
      </Segment>
      <Divider />

      <Segment style={{ boxShadow: "none", border: "0" }}>
        <Form>
          <Form.Field>
            <label>Schedule</label>
            <TextArea
              value={data.schedule}
              placeholder=" Add some activity here..."
              onChange={(e) => {
                console.log(e.target.value);
                setData({
                  ...data,
                  schedule: e.target.value,
                });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Time</label>
            <input
              value={data.time}
              type="time"
              placeholder="Time"
              onChange={(e) => {
                console.log(e.target.value);

                setData({
                  ...data,
                  time: e.target.value,
                });
              }}
            />
          </Form.Field>

          <Button secondary onClick={onsubmit}>
            Add
          </Button>
        </Form>
      </Segment>
      <Divider />
      <Segment style={{ boxShadow: "none", border: "0" }}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>S.No</Table.HeaderCell>
              <Table.HeaderCell>Schedule </Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {todaData?.map((ele, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>{ele.schedule} </Table.Cell>
                  <Table.Cell>{arrangeTime(ele.time)}</Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button
                        positive
                        onClick={() => {
                          edit(idx);
                        }}>
                        Edit
                      </Button>
                      <Button.Or />
                      <Button negative onClick={() => cancel(idx)}>
                        Delete
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Segment>
    </>
  );
}
