<?php
/**
 * PHXView Engine
 *
 * View engine that allows you to specify independent components 
 * and overall layout files.  The engine uses the default view
 * engine provided by code igniter at its heart.
 *
 * @author		Larry Beall
 * @copyright	Copyright (c) 2007
 * @link		http://www.phoenix-powered.com
 */ 

// ------------------------------------------------------------------------

/**
 * PHXView Class
 *
 * Loads Views, Components and Layouts
 *
 * @author		Larry Beall
 */
class PHXView
{
	// View Partial Containers
	var $_Components = array();
	var $_View = '';
	
	// Parameters necessary for the operation of the class
	// This will be set automatically.
	var $_CI = null;
	var $_ComponentPath = null;
	var $_LayoutPath = null;
	
	/**
	 * Constructor
	 *
	 * Sets the paths to the components and layout class files and retrives CI instance.
	 *
	 * @access public
	 */
	function PHXView()
	{
		$this->_CI =& get_instance();
		$this->_ComponentPath = APPPATH . 'components/';
		$this->_LayoutPath = APPPATH . 'layouts/';
		
		// attempt to load the components config file.
		// fail gracefully as if it doesn't exist we really
		// don't care.
		$this->_CI->config->load('components', false, true);
	}
	
	/**
	 * Layout Renderer
	 *
	 * This function will render the specified layout and all specified components
	 * This should be the last function called in your controller when rendering
	 * content.
	 *
	 * @access	public
	 * @param	string	the name of the layout file/class to render
	 * @param	mixed	either a string component name or array of component names to render
	 * @param	array	array of data elements to be used in the display of all data.
	 * @return	void
	 */
	function RenderLayout($layout, $components = array(), $data = array())
	{
		// if the components variable is not an array
		// lets make it one so the method can flow well.
		if(!is_array($components))
		{
			$components = array($components);
		}
		
		// get the components item from config
		$configComponents = $this->_CI->config->item('components');
		
		if($configComponents)
		{
			// if config components exists, is an array
			// and has items merge it with the current components
			if(is_array($configComponents))
			{
				if(count($configComponents) > 0)
				{
					$components = array_merge($components, $configComponents);
				}
			}
			// if config components is a string and is longer
			// than zero append it to the end of the components array.
			else
			{
				if(strlen($configComponents) > 0)
				{
					$components[] = $configComponents;
				}
			}
		}
		
		if(is_array($components))
		{
			if(count($components) > 0)
			{
				// if there are components lets render them
				foreach($components as $component)
				{
					$this->RenderComponent($component, $data);
				}
			}
		}
		
		// add the rendered components to the collection of data 
		// to be passed to the layout for rendering
		$data['components'] = $this->_Components;
		// add the rendered view to the collection of data to be
		// passed to the layout for rendering.
		$data['view'] = $this->_View;
		
		$layoutClassFile = $this->_LayoutPath . $layout . EXT;
		
		// is there a class file fore this layout?
		if(file_exists($layoutClassFile))
		{
			if(include($layoutClassFile))
			{
				if(class_exists($layout) == true)
				{
					$layoutClass = new $layout;
					$layoutClass->Render($data, $this);
					
					return;
				}
			}
		}
		
		// no class file just render layout view.
		$this->RenderLayoutView($layout, $data);
	}
	
	/**
	 * Layout View Renderer
	 * 
	 * This should be used in a layout class when you are ready to render 
	 * the layout view.
	 *
	 * @access	public
	 * @param	string	name of layout view to render
	 * @param	array	elements to be used in the display of the layout view.
	 * @return	void
	 */
	function RenderLayoutView($layoutView, $data = array())
	{
		$this->_CI->load->view('layouts/' . $layoutView, $data);
	}
	
	/**
	 * Component Renderer
	 * 
	 * Used to render a component.  A component can be as simple as an 
	 * HTML file or as complex as a class.
	 *
	 * @access	public
	 * @param	string	name of component view/component class to render
	 * @param	array	elements to be used in the the rendering of the component
	 * @return	void
	 */
	function RenderComponent($component, $data = array())
	{
		$componentClassFile = $this->_ComponentPath . $component . EXT;
		
		// is there a class file for this component?
		if(file_exists($componentClassFile))
		{
			if(include($componentClassFile))
			{
				if(class_exists($component) == true)
				{
					$componentClass = new $component;
					$this->_Components[$component] = $componentClass->Render($data, $this);
					
					return;
				}
			}
		}
		
		// no class file just render component view file.
		$this->_Components[$component] = $this->RenderComponentView($component, $data);
	}
	
	/**
	 * Component View Renderer
	 * 
	 * This is used to return the html for the currently executing component.
	 * This should be used in the component class to render the component view.
	 * 
	 * @access	public
	 * @param	string	name of component view to render
	 * @param	array	elements to be used in the rendering of the component view.
	 * @return	string	HTML string representing the component view.
	 */
	function RenderComponentView($componentView, $data = array())
	{
		return $this->_CI->load->view('components/' . $componentView, $data, true);
	}
	
	/**
	 * View Renderer
	 *
	 * This is used to render the view for the current action.
	 * It is just a wrapper around the CI view function and sets the html
	 * of the view to the view property of this class.
	 *
	 * @access	public
	 * @param	string	name of the view to render
	 * @param	array	elements to be used in the rendering of the specified view
	 */
	function RenderView($view, $data = array())
	{
		$this->_View = $this->_CI->load->view($view, $data, true);
	}
}

?>