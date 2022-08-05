import React from "react";
import { CircleComponent } from "./styles";

const Circle: React.FC<{ size: number, position: string, type: number }> = ({ size, position, type }) => {
	return (
		<CircleComponent type={type} size={size} position={position} />
	)
}

export default Circle;
