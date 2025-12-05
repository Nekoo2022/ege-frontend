import React from "react";
import type { TableSpec } from "../types/task";

interface Props {
  spec: TableSpec;
}

export const GenericTableRenderer: React.FC<Props> = ({ spec }) => {
  console.log("spec", spec);
  return (
    <div className="overflow-x-auto mb-6">
      <table className="table-auto w-full border border-border rounded-lg">
        <thead>
          {spec.headerRows.map((hdr, i) => (
            <tr key={i} className="bg-muted">
              {hdr.map((cell, j) => (
                <th key={j} className="border px-4 py-3 text-center text-sm font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {spec.bodyRows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.cells.map((c, cIdx) => {
                if (c.kind === "label") {
                  return (
                    <td key={cIdx} className="border px-4 py-3 text-left font-medium">
                      {c.text}
                    </td>
                  );
                }
                if (c.kind === "option") {
                  return (
                    <td key={cIdx} className="border px-4 py-3 text-center">
                      {c.text ?? ""}
                    </td>
                  );
                }
                return (
                  <td key={cIdx} className="border px-4 py-3">
                    &nbsp;
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTableRenderer;
