import React from "react";
interface MessageProps {
	children?: string;
	style?: CSSStyleDeclaration;
}

export default function ErrorMessage(props: MessageProps): JSX.Element {
	const {
		children,
		style: passedStyle = {},
	} = props;

	return (
		<div style={passedStyle} className="mt-5 text-xs md:text-md lg:text-lg flex tracking-wider font-['Work-Sans'] font-normal text-error-500" >
			{children}
		</div>
	);
}