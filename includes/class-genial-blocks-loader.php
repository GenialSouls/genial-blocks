<?php
/**
 * Registers and runs plugin hooks.
 *
 * @package GenialSouls\GenialBlocks
 */

namespace GenialSouls\GenialBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Collects and registers plugin hooks.
 */
class Loader {
	/**
	 * Registered actions.
	 *
	 * @var array<int, array<string, mixed>>
	 */
	private $actions = array();

	/**
	 * Queues an action for registration.
	 *
	 * @param string $hook          Hook name.
	 * @param object $component     Component instance.
	 * @param string $callback      Method name.
	 * @param int    $priority      Hook priority.
	 * @param int    $accepted_args Accepted argument count.
	 * @return void
	 */
	public function add_action( $hook, $component, $callback, $priority = 10, $accepted_args = 1 ) {
		$this->actions[] = array(
			'hook'          => $hook,
			'component'     => $component,
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		);
	}

	/**
	 * Registers queued hooks with WordPress.
	 *
	 * @return void
	 */
	public function run() {
		foreach ( $this->actions as $action ) {
			add_action( $action['hook'], array( $action['component'], $action['callback'] ), $action['priority'], $action['accepted_args'] );
		}
	}
}
