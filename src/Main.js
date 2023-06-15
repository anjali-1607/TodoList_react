import React, { useState } from "react";

import { Button, Segment, Table, TextArea, Form } from "semantic-ui-react";

import { info } from "./InfoApi";

export default function Main() {
  const [todaData, setTodoData] = useState(info);
  const [data, setData] = useState({});

  const onsubmit = () => {
    console.log(data);
    const time = data.time;
    const splittedTime = time.split(":");
    const AmOrPm = splittedTime[0] >= 12 ? "PM" : "AM";

    const hours = splittedTime[0] % 12 || 12;
    const finalTime = splittedTime[0] + ":" + splittedTime[1] + " " + AmOrPm;
    console.log(finalTime);
    console.log(todaData);
    setData("");
    setTodoData([...todaData, { ...data, time: finalTime }]);
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
    setData(editTable[0]);
  }

  return (
    <>
      <Segment color="grey">
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
      <Segment>
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

      <Segment color="grey">
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
                  <Table.Cell>{ele.time}</Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button positive onClick={() => edit(idx)}>
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
