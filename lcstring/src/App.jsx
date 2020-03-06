import React, { useState } from "react";
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

  const handleChange = event => {
    if (event.target.name === "seq1") {
      setSeq1(event.target.value);
    } else if (event.target.name === "seq2") {
      setSeq2(event.target.value);
    }
  };

  const LCSmatrix = () => {
    console.log(matrix);
    console.log(lcs)
    if (draw) {
      return (
        <div>
        <h2>LCS:  <h2 className="answer">{lcs}</h2></h2>
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
                    {value.map((chr, ind) => (
                      <td key={ind}>{chr}</td>
                    ))}
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
    const lcsMatrix = Array(ver.length + 2)
      .fill(null)
      .map(() => Array(hor.length + 2).fill(null));

    //filling seq1 in first row
    for (let colIndex = 0; colIndex <= hor.length + 1; colIndex++) {
      if (colIndex < 2) lcsMatrix[0][colIndex] = "";
      else lcsMatrix[0][colIndex] = hor[colIndex - 2];
    }

    //filling seq2 in first col
    for (let rowIndex = 0; rowIndex <= ver.length + 1; rowIndex++) {
      if (rowIndex < 2) lcsMatrix[rowIndex][0] = "";
      else lcsMatrix[rowIndex][0] = ver[rowIndex - 2];
    }

    //filling second row with zeroes
    for (let colIndex = 1; colIndex <= hor.length + 1; colIndex++) {
      lcsMatrix[1][colIndex] = 0;
    }

    //fillimg second column with zeroes
    for (let rowIndex = 1; rowIndex <= ver.length + 1; rowIndex++) {
      lcsMatrix[rowIndex][1] = 0;
    }

    // Fill rest of the column that correspond to each of two strings.
    for (let rowIndex = 2; rowIndex <= ver.length + 1; rowIndex++) {
      for (let colIndex = 2; colIndex <= hor.length + 1; colIndex++) {
        if (hor[colIndex - 2] === ver[rowIndex - 2]) {
          //matching top-left arrow
          lcsMatrix[rowIndex][colIndex] =
            lcsMatrix[rowIndex - 1][colIndex - 1] + 1;
          //draw top left arrow here
        } else if (
          lcsMatrix[rowIndex - 1][colIndex] >= lcsMatrix[rowIndex][colIndex - 1]
        ) {
          lcsMatrix[rowIndex][colIndex] = lcsMatrix[rowIndex - 1][colIndex];
          //draw top arrow
        } else {
          lcsMatrix[rowIndex][colIndex] = lcsMatrix[rowIndex][colIndex - 1];
          //draw left arrow
        }
      }
    }


    const longestSequence = [];
    let columnIndex = hor.length;
    let rowIndex = ver.length;

    while (columnIndex > 0 || rowIndex > 0) {
      console.log(hor[columnIndex - 1])
      if (hor[columnIndex - 1] === ver[rowIndex - 1]) {
        // Move by diagonal left-top.
        longestSequence.unshift(hor[columnIndex - 1]);
        columnIndex -= 1;
        rowIndex -= 1;
      } else if (
        lcsMatrix[rowIndex-1][columnIndex] ===
        lcsMatrix[rowIndex][columnIndex]
      ) {
        // Move up.
        rowIndex -= 1;
        
      } else {
        // Move left.
        columnIndex -= 1;
      }
    }

    setLcs(longestSequence);
    setMatrix(lcsMatrix);
    setDraw(true);
  };

  return (
    <div className="container">
      <h1>Longest Common SubSequence Algorithm</h1>
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

      <LCSmatrix />
    </div>
  );
}

export default App;
