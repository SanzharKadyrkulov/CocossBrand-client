import React, { FC } from 'react';
import Header from '../shared/Header';

const HeaderLayout: FC = ({ children }) => {
	return (
		<>
			<Header />
			<div>{children}</div>
		</>
	);
};

export default HeaderLayout;
