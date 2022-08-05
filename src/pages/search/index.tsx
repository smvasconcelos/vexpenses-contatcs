import React from 'react';
import UserTemplate from 'templates/user';

const SearchContent: React.FC = () => {
	return (
		<></>
	)
}

const Search: React.FC = () => {
	return (
		<UserTemplate children={<SearchContent />} />
	);
};

export default Search;
