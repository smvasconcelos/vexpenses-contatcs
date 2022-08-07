import React from "react";
import { useForm } from "react-hook-form";

const Form: React.FC<
	{
		defaultValues?: any,
		children?: any,
		onSubmit?: any
	}
> = ({ defaultValues, children, onSubmit }) => {

	const methods = useForm({ defaultValues });
	const { handleSubmit } = methods;

	return (
		<form onSubmit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			handleSubmit(onSubmit)
		}}>
			{React.Children.map(children, child => {
				return child.props.name
					? React.createElement(child.type, {
						...{
							...child.props,
							register: methods.register,
							getValues: methods.getValues,
							unregister: methods.unregister,
							setValue: methods.setValue,
							key: child.props.name
						}
					})
					: child;
			})}
		</form>
	);
}

export default Form;
