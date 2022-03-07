import React from 'react';
import HeaderLayout from '../app/components/layouts/HeaderLayout';
import Contacts from '../app/components/screens/Contacts';

const ContactsPage = () => {
	return (
		<HeaderLayout>
			<div className='max-w-2xl mx-auto'>
				<Contacts />
			</div>
		</HeaderLayout>
	);
};

export default ContactsPage;
