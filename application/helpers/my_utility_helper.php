<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
	function __construct()
	{
		parent::__construct();
		$this->ci =& get_instance();
		$this->ci->load->database();
	}

	function myNumberFormat($number, $showDecimal = FALSE){
		$s = number_format($number, 2);
		if($showDecimal)
			return $s;
		else
			return preg_replace('/(\.00)$/' ,'',$s);
	}

	function myDateFormat($dt_str, $format = 'd/m/Y'){
		$unix = mysql_to_unix($dt_str);
		return date($format, $unix);
	}

	function isDate( $str ){
		return (DateTime::createFromFormat('Y-m-d H:i:s', $myString) !== FALSE);
	}

?>