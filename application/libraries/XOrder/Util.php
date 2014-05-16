<?php

class Util {

	public function getDateStr($item){
		$dt = (!empty($item->update_date))?$item->update_date:$item->create_date;
		$dt = preg_replace('/\s/', '_', $dt);
		return $dt;
	}

}