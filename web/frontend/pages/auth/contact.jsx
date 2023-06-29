import {Card, Page, Layout, TextContainer, Text} from '@shopify/polaris';
import {TitleBar, Toast} from '@shopify/app-bridge-react';
import {useTranslation} from 'react-i18next';
import {TextField} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import {useAuthenticatedFetch} from '../../hooks/index.js';

export default function PageName() {
	const {t} = useTranslation();
	const emptyToastProps = {content: null};
	const [isLoading, setIsLoading] = useState(false);
	const [toastProps, setToastProps] = useState(emptyToastProps);
	const fetch = useAuthenticatedFetch();
	const [value, setValue] = useState('');

	const handleChange = useCallback(
		(newValue) => setValue(newValue),
		[],
	);

	const toastMarkup = toastProps.content && (
		<Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)}/>
	);

	const handleSubmit = async () => {
		setIsLoading(true);
		const response = await fetch('/api/auth/key', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Add any additional headers as needed
			},
			body: JSON.stringify({authKey: value}),
		});

		if (response.ok) {
			setToastProps({
				content: 'Congrats. You save your auth key!',
			});
			setIsLoading(false);
		} else {
			setIsLoading(false);
			setToastProps({
				content: t('ProductsCard.errorCreatingProductsToast'),
				error: true,
			});
		}
	};

	return (
		<Page>
			{toastMarkup}
			<TitleBar
				title="Write your problem"
			/>
			<Layout>
				<Layout.Section>
					<Card sectioned
						  primaryFooterAction={{
							  content: 'Send',
							  onAction: handleSubmit,
							  loading: isLoading,
						  }}>
						<Text variant="headingMd" as="h2">
							Write your problem
						</Text>
						<TextField
							label="What is the problem"
							value={value}
							onChange={handleChange}
							autoComplete="off"
							placeholder="Problem"
						/>
					</Card>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
