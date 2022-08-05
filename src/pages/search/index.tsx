import React from 'react';
import Template from 'templates';

const SearchContent: React.FC = () => {
	return (
		<></>
	)
}

const Search: React.FC = () => {
	return (
		<Template children={<SearchContent />} />
	);
};

export default Search;
