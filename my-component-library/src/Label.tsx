import React from "react";
import cls from 'classnames';

interface LabelProps {
	error?: boolean;
    text?: string | undefined;
	style?: CSSStyleDeclaration;
}

export default function Label(props: LabelProps): JSX.Element {
	const {
        error,
        text,
		style: passedStyle = {},
	} = props;

    const isError = error === true

	return (
		<div style={passedStyle} className={cls({"text-error-500": isError}, {"text-success-500": !isError}, "text-xs md:text-md lg:text-lg flex tracking-wider font-['Work-Sans'] font-normal")} >
		 {text}
		</div>
	);
}