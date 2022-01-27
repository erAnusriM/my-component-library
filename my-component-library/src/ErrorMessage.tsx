import React from "react";
import { FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import colorConstant from "../../../../assets/styles/colorconstants";
import cls from "classnames";

interface MessageProps {
	error?: boolean;
	className?: any;
	children?: string;
	style?: any;
}

// const defaultValue = {
// 	style: {},
// 	className: {},
// };

export default function ErrorMessage(props: MessageProps): JSX.Element {
	const {
		children,
		className: { passedClassName } = {},
		style: passedStyle = {},
	} = props;

	const errorStyles = makeStyles({
		root: {
			display: "flex",
			fontSize: "12px",
			fontStretch: "normal",
			fontStyle: "normal",
			lineHeight: "1.17",
			letterSpacing: "normal",
			textAlign: "left",
			fontFamily: "Work Sans",
			fontWeight: 400,
			color: "#FC4A43",
		},
	});

	const errorClass = errorStyles();

	return (
		<FormHelperText className={cls("xs:text-xs md:text-md lg:text-lg", errorClass.root , passedClassName)} style={passedStyle}>
			{children}
		</FormHelperText>
	);
}