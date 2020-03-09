import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { ArcherContainer, ArcherElement } from "react-archer";

function App() {
  const [seq1, setSeq1] = useState("");
  const [seq2, setSeq2] = useState("");
  const [draw, setDraw] = useState(false);
  const [matrix, setMatrix] = useState([]);
  const [lcs, setLcs] = useState([]);
  const [cells, setCells] = useState([]);
  const [horDim, setHorDim] = useState([]);
  const [shade, setShade] = useState([]);

  useEffect(() => {
    console.log("shade");
  }, [shade]);

  const handleShade = param => {
    setShade(param);
  };

  const handleChange = event => {
    setShade([]);
    if (event.target.name === "seq1") {
      setSeq1(event.target.value);
    } else if (event.target.name === "seq2") {
      setSeq2(event.target.value);
    }
  };

  const LCSmatrix = () => {
    if (draw) {
      return (
        <div>
          <h2>LCS: </h2>
          <h2 className="answer">{lcs}</h2>
          <div> </div>
          <ArcherContainer
            strokeColor="rgba(255, 0, 0,0.7)"
            arrowThickness={10}
            strokeWidth={1}
          >
            <div className="table">
              <table cellPadding="10px" cellSpacing="10px">
                <tbody>
                  {matrix.map((value, index) => (
                    <tr key={index}>
                      {value.map((chr, ind) => cells[index * horDim + ind])}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ArcherContainer>
          <div> </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const run = () => {
    const hor = seq1.split("");
    const ver = seq2.split("");
    const cl = [];
    let shadeMe = false;

    const lcsMatrix = Array(ver.length + 2)
      .fill(null)
      .map(() => Array(hor.length + 2).fill(null));

    let shadeInit = Array(ver.length + 2)
      .fill(false)
      .map(() => Array(hor.length + 2).fill(false));

    for (let rowIndex = 0; rowIndex <= ver.length + 1; rowIndex++) {
      for (let colIndex = 0; colIndex <= hor.length + 1; colIndex++) {
        if (shade.length > 2) {
          shadeMe = shade[rowIndex][colIndex];
          console.log(shade);
        } else {
          shadeMe = shadeInit[rowIndex][colIndex];
        }

        if (rowIndex === 0) {
          if (colIndex < 2) lcsMatrix[0][colIndex] = "";
          else lcsMatrix[0][colIndex] = hor[colIndex - 2];

          cl.push(
            <td
              key={0 + "" + colIndex}
              style={{ backgroundColor: shadeMe ? "#fdff96" : "#fff" }}
            >
              <ArcherElement id={0 + "" + colIndex}>
                {lcsMatrix[0][colIndex]}
              </ArcherElement>
            </td>
          );
        } else if (rowIndex === 1) {
          if (colIndex < 1) lcsMatrix[1][colIndex] = "";
          else lcsMatrix[1][colIndex] = 0;

          cl.push(
            <td
              key={1 + "" + colIndex}
              style={{ backgroundColor: shadeMe ? "#fdff96" : "#fff" }}
            >
              <ArcherElement id={1 + "" + colIndex}>
                {lcsMatrix[1][colIndex]}
              </ArcherElement>
            </td>
          );
        } else {
          if (colIndex === 0) {
            lcsMatrix[rowIndex][colIndex] = ver[rowIndex - 2];
            cl.push(
              <td
                key={rowIndex + "" + 0}
                style={{ backgroundColor: shadeMe ? "#fdff96" : "#fff" }}
              >
                <ArcherElement id={rowIndex + "" + 0}>
                  {lcsMatrix[rowIndex][0]}
                </ArcherElement>
              </td>
            );
          } else if (colIndex === 1) {
            lcsMatrix[rowIndex][colIndex] = 0;
            cl.push(
              <td
                key={rowIndex + "" + 1}
                style={{ backgroundColor: shadeMe ? "#fdff96" : "#fff" }}
              >
                <ArcherElement id={rowIndex + "" + 1}>
                  {lcsMatrix[rowIndex][1]}
                </ArcherElement>
              </td>
            );
          } else if (hor[colIndex - 2] === ver[rowIndex - 2]) {
            //matching top-left arrow
            lcsMatrix[rowIndex][colIndex] =
              lcsMatrix[rowIndex - 1][colIndex - 1] + 1;
            //draw top left arrow here
            cl.push(
              <td
                key={rowIndex + "" + colIndex}
                style={{ backgroundColor: shadeMe ? "#fdff96" : "#fff" }}
              >
                <ArcherElement
                  id={rowIndex + "" + colIndex}
                  relations={[
                    {
                      targetId: rowIndex - 1 + "" + (colIndex - 1),
                      targetAnchor: "right",
                      sourceAnchor: "left"
                    }
                  ]}
                >
                  {lcsMatrix[rowIndex][colIndex]}
                </ArcherElement>
              </td>
            );
          } else if (
            lcsMatrix[rowIndex - 1][colIndex] ===
            lcsMatrix[rowIndex][colIndex - 1]
          ) {
            lcsMatrix[rowIndex][colIndex] = lcsMatrix[rowIndex - 1][colIndex];
            //draw top arrow
            cl.push(
              <td
                key={rowIndex + "" + colIndex}
                style={{ backgroundColor: shadeMe ? "#fdff96" : "#fff" }}
              >
                <ArcherElement
                  id={rowIndex + "" + colIndex}
                  relations={[
                    {
                      targetId: rowIndex - 1 + "" + colIndex,
                      targetAnchor: "bottom",
                      sourceAnchor: "top"
                    },
                    {
                      targetId: rowIndex + "" + (colIndex - 1),
                      targetAnchor: "right",
                      sourceAnchor: "left"
                    }
                  ]}
                >
                  {lcsMatrix[rowIndex][colIndex]}
                </ArcherElement>
              </td>
            );
          } else if (
            lcsMatrix[rowIndex - 1][colIndex] >=
            lcsMatrix[rowIndex][colIndex - 1]
          ) {
            lcsMatrix[rowIndex][colIndex] = lcsMatrix[rowIndex - 1][colIndex];
            //draw top arrow
            cl.push(
              <td
                key={rowIndex + "" + colIndex}
                style={{ backgroundColor: shadeMe ? "#fdff96" : "#fff" }}
              >
                <ArcherElement
                  id={rowIndex + "" + colIndex}
                  relations={[
                    {
                      targetId: rowIndex - 1 + "" + colIndex,
                      targetAnchor: "bottom",
                      sourceAnchor: "top"
                    }
                  ]}
                >
                  {lcsMatrix[rowIndex][colIndex]}
                </ArcherElement>
              </td>
            );
          } else {
            lcsMatrix[rowIndex][colIndex] = lcsMatrix[rowIndex][colIndex - 1];
            //draw left arrow
            cl.push(
              <td
                key={rowIndex + "" + colIndex}
                style={{ backgroundColor: shadeMe ? "#fdff96" : "#fff" }}
              >
                <ArcherElement
                  id={rowIndex + "" + colIndex}
                  relations={[
                    {
                      targetId: rowIndex + "" + (colIndex - 1),
                      targetAnchor: "right",
                      sourceAnchor: "left"
                    }
                  ]}
                >
                  {lcsMatrix[rowIndex][colIndex]}
                </ArcherElement>
              </td>
            );
          }
        }
      }
    }

    const longestSequence = [];
    let columnIndex = hor.length;
    let rowIndex = ver.length;

    setHorDim(hor.length + 2);

    while (rowIndex > 0 && columnIndex > 0) {
      console.log(hor[columnIndex - 1]);
      if (hor[columnIndex - 1] === ver[rowIndex - 1]) {
        // Move by diagonal left-top.
        shadeInit[rowIndex + 1][columnIndex + 1] = true;
        longestSequence.unshift(hor[columnIndex - 1]);
        columnIndex -= 1;
        rowIndex -= 1;
      } else if (
        lcsMatrix[rowIndex][columnIndex+1] >=
        lcsMatrix[rowIndex+1][columnIndex]
      ) {
        shadeInit[rowIndex + 1][columnIndex + 1] = true;
        // Move up.
        rowIndex -= 1;
      } else {
        shadeInit[rowIndex + 1][columnIndex + 1] = true;
        // Move left.
        columnIndex -= 1;
      }
    }

    setLcs(longestSequence);
    setMatrix(lcsMatrix);
    setDraw(true);
    setCells(cl);
    setShade(shadeInit);
  };

  return (
    <div className="container">
      <h1>Longest Common Subsequence Algorithm</h1>
      <div className="sequences">
        <TextField
          label="Sequence 1"
          type="text"
          name="seq1"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          className="txt"
        />
        <TextField
          label="Sequence 2"
          type="text"
          name="seq2"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          className="txt"
        />
      </div>
      <Button
        onClick={run}
        variant="danger"
        style={{ width: "100px", fontWeight: "bold" }}
      >
        RUN
      </Button>
      <p>Double Click to show Trace</p>

      <LCSmatrix />
    </div>
  );
}

export default App;
