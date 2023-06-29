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

	useEffect(() => {
		getAuthKey();

	}, []);

	const getAuthKey = async () => {
		const response =  await fetch('/api/auth/key');
		const data = await response.json();
		setValue(data.authKey)
	};

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
				title={t('PageName.title')}
			/>
			<Layout>
				<Layout.Section>
					<Card sectioned
						  primaryFooterAction={{
							  content: 'Submit',
							  onAction: handleSubmit,
							  loading: isLoading,
						  }}>
						<Text variant="headingMd" as="h2">
							Authentication Key
						</Text>
						<TextField
							label="Auth Key"
							value={value}
							onChange={handleChange}
							autoComplete="off"
						/>
					</Card>
				</Layout.Section>
			</Layout>
		</Page>
	);
}
