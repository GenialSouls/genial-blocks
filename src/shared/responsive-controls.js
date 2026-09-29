import { __ } from '@wordpress/i18n';
import { TabPanel } from '@wordpress/components';

export function ResponsiveDeviceTabs( { children } ) {
	return (
		<TabPanel
			tabs={ [
				{ name: 'desktop', title: __( 'Desktop', 'genial-blocks' ) },
				{ name: 'tablet', title: __( 'Tablet', 'genial-blocks' ) },
				{ name: 'mobile', title: __( 'Mobile', 'genial-blocks' ) },
			] }
		>
			{ ( tab ) => children( tab.name ) }
		</TabPanel>
	);
}
