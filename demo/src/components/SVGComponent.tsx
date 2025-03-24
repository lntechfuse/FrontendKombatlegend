import React from "react";
import Hexagon from "./Hexagon";
export interface MinionPlacement {
  row: number;
  col: number;
  minionType: string;
}

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
  currentPlayer: number;
  // รับค่า minionPlacements จากภายนอก (ผ่านการพิมพ์ row,col)
  minionPlacements?: MinionPlacement[];
}

const SVGComponent: React.FC<SVGComponentProps> = ({
  currentPlayer,
  minionPlacements = [],
  ...props
}) => {
  // ฟังก์ชันสำหรับคำนวณตำแหน่งกึ่งกลางของ Hexagon
  // ค่าเหล่านี้คำนวณจากการวัดใน path ของ Hexagon ที่ออกแบบไว้
  // โดยประมาณ: สำหรับ Row 1, Col 1 center อยู่ที่ (46,85)
  // Horizontal spacing ~ 79, vertical spacing ~ 83
  const getHexCenter = (row: number, col: number) => {
    const startX = 46;
    const startY = 85;
    const spacingX = 79;
    const spacingY = 83;
    let x = startX + (col - 1) * spacingX;
    let y = startY + (row - 1) * spacingY;
    // ถ้า col เป็นเลขคู่ ให้เลื่อน minion ขึ้นด้านบน
    if (col % 2 === 0) {
      y = y - spacingY / 2; // ปรับค่า offset ตามที่เหมาะสม ถ้าไม่พอสามารถปรับตัวเลขนี้เพิ่มหรือลดได้
    }
    return { x, y };
  };
  
  // ฟังก์ชันสำหรับดึงที่อยู่ของรูป minion ตามชนิด
  const getMinionImage = (minionType: string): string => {
    switch (minionType) {
      case "Mage":
        return process.env.PUBLIC_URL + "/Minion/Mage.png";
      case "Warrior":
        return process.env.PUBLIC_URL + "/Minion/Warrior.png";
      case "Tank":
        return process.env.PUBLIC_URL + "/Minion/Tank.png";
      default:
        return "";
    }
  };

  return (
    <svg
      width={660}
      height={702}
      viewBox="0 0 660 702"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* ============ Row 1 ============ */}
      <Hexagon
        row={1}
        col={1}
        d="M3.4043 85L28.404 45.1228L78.4034 45.3685L103.403 85.4914L78.4034 125.369L28.404 125.123L3.4043 85Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={1}
        col={2}
        d="M82.4033 43L107.403 3.12285L157.402 3.36855L182.402 43.4914L157.402 83.3685L107.403 83.1228L82.4033 43Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={1}
        col={3}
        d="M161.402 85.9312L186.402 46.054L236.401 46.2997L261.401 86.4226L236.401 126.3L186.402 126.054L161.402 85.9312Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={1}
        col={4}
        d="M240.401 43.9312L265.401 4.054L315.4 4.2997L340.4 44.4226L315.4 84.2997L265.401 84.054L240.401 43.9312Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={1}
        col={5}
        d="M319.399 85.9312L344.399 46.054L394.399 46.2997L419.398 86.4226L394.399 126.3L344.399 126.054L319.399 85.9312Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={1}
        col={6}
        d="M398.398 43.9312L423.398 4.054L473.398 4.2997L498.397 44.4226L473.398 84.2997L423.398 84.054L398.398 43.9312Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={1}
        col={7}
        d="M477.397 85.9312L502.397 46.054L552.396 46.2997L577.396 86.4226L552.396 126.3L502.397 126.054L477.397 85.9312Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={1}
        col={8}
        d="M556.396 44.9312L581.396 5.054L631.395 5.2997L656.395 45.4226L631.395 85.2997L581.396 85.054L556.396 44.9312Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />

      {/* ============ Row 2 ============ */}
      <Hexagon
        row={2}
        col={1}
        d="M3 167.931L27.9997 128.054L77.9991 128.3L102.999 168.423L77.9991 208.3L27.9997 208.054L3 167.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={2}
        col={2}
        d="M81.999 125.931L106.999 86.054L156.998 86.2997L181.998 126.423L156.998 166.3L106.999 166.054L81.999 125.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={2}
        col={3}
        d="M160.998 168.862L185.997 128.985L235.997 129.231L260.996 169.354L235.997 209.231L185.997 208.985L160.998 168.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={2}
        col={4}
        d="M239.997 126.862L264.996 86.9852L314.996 87.2309L339.995 127.354L314.996 167.231L264.996 166.985L239.997 126.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={2}
        col={5}
        d="M318.995 168.862L343.995 128.985L393.994 129.231L418.994 169.354L393.994 209.231L343.995 208.985L318.995 168.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={2}
        col={6}
        d="M397.994 126.862L422.994 86.9852L472.993 87.2309L497.993 127.354L472.993 167.231L422.994 166.985L397.994 126.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={2}
        col={7}
        d="M476.993 168.862L501.992 128.985L551.992 129.231L576.991 169.354L551.992 209.231L501.992 208.985L476.993 168.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={2}
        col={8}
        d="M555.992 127.862L580.991 87.9852L630.991 88.2309L655.99 128.354L630.991 168.231L580.991 167.985L555.992 127.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />

      {/* ============ Row 3 ============ */}
      <Hexagon
        row={3}
        col={1}
        d="M3 249.931L27.9997 210.054L77.9991 210.3L102.999 250.423L77.9991 290.3L27.9997 290.054L3 249.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={3}
        col={2}
        d="M81.999 207.931L106.999 168.054L156.998 168.3L181.998 208.423L156.998 248.3L106.999 248.054L81.999 207.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={3}
        col={3}
        d="M160.998 250.862L185.997 210.985L235.997 211.231L260.996 251.354L235.997 291.231L185.997 290.985L160.998 250.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={3}
        col={4}
        d="M239.997 208.862L264.996 168.985L314.996 169.231L339.995 209.354L314.996 249.231L264.996 248.985L239.997 208.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={3}
        col={5}
        d="M318.995 250.862L343.995 210.985L393.994 211.231L418.994 251.354L393.994 291.231L343.995 290.985L318.995 250.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={3}
        col={6}
        d="M397.994 208.862L422.994 168.985L472.993 169.231L497.993 209.354L472.993 249.231L422.994 248.985L397.994 208.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={3}
        col={7}
        d="M476.993 250.862L501.992 210.985L551.992 211.231L576.991 251.354L551.992 291.231L501.992 290.985L476.993 250.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={3}
        col={8}
        d="M555.992 209.862L580.991 169.985L630.991 170.231L655.99 210.354L630.991 250.231L580.991 249.985L555.992 209.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />

      {/* ============ Row 4 ============ */}
      <Hexagon
        row={4}
        col={1}
        d="M3 332.931L27.9997 293.054L77.9991 293.3L102.999 333.423L77.9991 373.3L27.9997 373.054L3 332.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={4}
        col={2}
        d="M81.999 290.931L106.999 251.054L156.998 251.3L181.998 291.423L156.998 331.3L106.999 331.054L81.999 290.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={4}
        col={3}
        d="M160.998 333.862L185.997 293.985L235.997 294.231L260.996 334.354L235.997 374.231L185.997 373.985L160.998 333.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={4}
        col={4}
        d="M239.997 291.862L264.996 251.985L314.996 252.231L339.995 292.354L314.996 332.231L264.996 331.985L239.997 291.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={4}
        col={5}
        d="M318.995 333.862L343.995 293.985L393.994 294.231L418.994 334.354L393.994 374.231L343.995 373.985L318.995 333.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={4}
        col={6}
        d="M397.994 291.862L422.994 251.985L472.993 252.231L497.993 292.354L472.993 332.231L422.994 331.985L397.994 291.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={4}
        col={7}
        d="M476.993 333.862L501.992 293.985L551.992 294.231L576.991 334.354L551.992 374.231L501.992 373.985L476.993 333.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={4}
        col={8}
        d="M555.992 292.862L580.991 252.985L630.991 253.231L655.99 293.354L630.991 333.231L580.991 332.985L555.992 292.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />

      {/* ============ Row 5 ============ */}
      <Hexagon
        row={5}
        col={1}
        d="M3 412.931L27.9997 373.054L77.9991 373.3L102.999 413.423L77.9991 453.3L27.9997 453.054L3 412.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={5}
        col={2}
        d="M81.999 370.931L106.999 331.054L156.998 331.3L181.998 371.423L156.998 411.3L106.999 411.054L81.999 370.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={5}
        col={3}
        d="M160.998 413.862L185.997 373.985L235.997 374.231L260.996 414.354L235.997 454.231L185.997 453.985L160.998 413.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={5}
        col={4}
        d="M239.997 371.862L264.996 331.985L314.996 332.231L339.995 372.354L314.996 412.231L264.996 411.985L239.997 371.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={5}
        col={5}
        d="M318.995 413.862L343.995 373.985L393.994 374.231L418.994 414.354L393.994 454.231L343.995 453.985L318.995 413.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={5}
        col={6}
        d="M397.994 371.862L422.994 331.985L472.993 332.231L497.993 372.354L472.993 412.231L422.994 411.985L397.994 371.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={5}
        col={7}
        d="M476.993 413.862L501.992 373.985L551.992 374.231L576.991 414.354L551.992 454.231L501.992 453.985L476.993 413.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={5}
        col={8}
        d="M555.992 372.862L580.991 332.985L630.991 333.231L655.99 373.354L630.991 413.231L580.991 412.985L555.992 372.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />

      {/* ============ Row 6 ============ */}
      <Hexagon
        row={6}
        col={1}
        d="M3 495.931L27.9997 456.054L77.9991 456.3L102.999 496.423L77.9991 536.3L27.9997 536.054L3 495.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={6}
        col={2}
        d="M81.999 453.931L106.999 414.054L156.998 414.3L181.998 454.423L156.998 494.3L106.999 494.054L81.999 453.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={6}
        col={3}
        d="M160.998 496.862L185.997 456.985L235.997 457.231L260.996 497.354L235.997 537.231L185.997 536.985L160.998 496.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={6}
        col={4}
        d="M239.997 454.862L264.996 414.985L314.996 415.231L339.995 455.354L314.996 495.231L264.996 494.985L239.997 454.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={6}
        col={5}
        d="M318.995 496.862L343.995 456.985L393.994 457.231L418.994 497.354L393.994 537.231L343.995 536.985L318.995 496.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={6}
        col={6}
        d="M397.994 454.862L422.994 414.985L472.993 415.231L497.993 455.354L472.993 495.231L422.994 494.985L397.994 454.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={6}
        col={7}
        d="M476.993 496.862L501.992 456.985L551.992 457.231L576.991 497.354L551.992 537.231L501.992 536.985L476.993 496.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={6}
        col={8}
        d="M555.992 455.862L580.991 415.985L630.991 416.231L655.99 456.354L630.991 496.231L580.991 495.985L555.992 455.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />

      {/* ============ Row 7 ============ */}
      <Hexagon
        row={7}
        col={1}
        d="M3 575.931L27.9997 536.054L77.9991 536.3L102.999 576.423L77.9991 616.3L27.9997 616.054L3 575.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={7}
        col={2}
        d="M81.999 533.931L106.999 494.054L156.998 494.3L181.998 534.423L156.998 574.3L106.999 574.054L81.999 533.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={7}
        col={3}
        d="M160.998 576.862L185.997 536.985L235.997 537.231L260.996 577.354L235.997 617.231L185.997 616.985L160.998 576.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={7}
        col={4}
        d="M239.997 534.862L264.996 494.985L314.996 495.231L339.995 535.354L314.996 575.231L264.996 574.985L239.997 534.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={7}
        col={5}
        d="M318.995 576.862L343.995 536.985L393.994 537.231L418.994 577.354L393.994 617.231L343.995 616.985L318.995 576.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={7}
        col={6}
        d="M397.994 534.862L422.994 494.985L472.993 495.231L497.993 535.354L472.993 575.231L422.994 574.985L397.994 534.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={7}
        col={7}
        d="M476.993 576.862L501.992 536.985L551.992 537.231L576.991 577.354L551.992 617.231L501.992 616.985L476.993 576.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={7}
        col={8}
        d="M555.992 535.862L580.991 495.985L630.991 496.231L655.99 536.354L630.991 576.231L580.991 575.985L555.992 535.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />

      {/* ============ Row 8 ============ */}
      <Hexagon
        row={8}
        col={1}
        d="M3 657.931L27.9997 618.054L77.9991 618.3L102.999 658.423L77.9991 698.3L27.9997 698.054L3 657.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={8}
        col={2}
        d="M81.999 615.931L106.999 576.054L156.998 576.3L181.998 616.423L156.998 656.3L106.999 656.054L81.999 615.931Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={8}
        col={3}
        d="M160.998 658.862L185.997 618.985L235.997 619.231L260.996 659.354L235.997 699.231L185.997 698.985L160.998 658.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={8}
        col={4}
        d="M239.997 616.862L264.996 576.985L314.996 577.231L339.995 617.354L314.996 657.231L264.996 656.985L239.997 616.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={8}
        col={5}
        d="M318.995 658.862L343.995 618.985L393.994 619.231L418.994 659.354L393.994 699.231L343.995 698.985L318.995 658.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={8}
        col={6}
        d="M397.994 616.862L422.994 576.985L472.993 577.231L497.993 617.354L472.993 657.231L422.994 656.985L397.994 616.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={8}
        col={7}
        d="M476.993 658.862L501.992 618.985L551.992 619.231L576.991 659.354L551.992 699.231L501.992 698.985L476.993 658.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />
      <Hexagon
        row={8}
        col={8}
        d="M555.992 617.862L580.991 577.985L630.991 578.231L655.99 618.354L630.991 658.231L580.991 657.985L555.992 617.862Z"
        fill="#1E1E1E"
        currentPlayer={currentPlayer}
      />

{minionPlacements.map((placement, index) => {
  const { x, y } = getHexCenter(placement.row, placement.col);
  return (
    <g key={index} transform={`translate(${x}, ${y})`}>
      <image
        href={process.env.PUBLIC_URL + `/Minion/${placement.minionType}.png`}
        x={-25} // offset image ให้ตรงกลาง
        y={-25} // offset image ให้ตรงกลาง
        width="50"
        height="50"
      />
    </g>
  );
})}

    </svg>
  );
};
export default SVGComponent;
