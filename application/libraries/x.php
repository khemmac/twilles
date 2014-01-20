<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

Class X {
	public static function newCls($cls){
		if (!class_exists($cls)) return null;
		return new $cls();
	}
	public static function Request($name){
		if(array_key_exists($name,$_GET))
			return $_GET[$name];
		else if(array_key_exists($name,$_POST))
			return $_POST[$name];
		else
			return null;
	}
	public static function toJSON($o){
		return json_encode($o);
	}
	public static function renderJSON($o){
		echo X::toJSON($o);
	}

	public static function parseJSON($o){
		return json_decode($o);
	}

	public static function getSession($key){
		$_CI = &get_instance();
		return $_CI->session->userdata($key);
	}
	public static function setSession($key,$value){
		$_CI = &get_instance();
		return $_CI->session->set_userdata($key,$value);
	}
	public static function unsetSession($key){
		$_CI = &get_instance();
		return $_CI->session->unset_userdata($key);
	}
	public static function getValue($val,$default){
		return (isset($val)&&trim($val)!='')?$val:$default;
	}
} //end X