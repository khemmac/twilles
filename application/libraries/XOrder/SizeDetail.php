<?php

class SizeDetail {

	public function get_measure_type($o){
		// งานวัดจากตัว
		if($o->member_size_type==1 || $o->member_size_type==2 || $o->member_size_type==3 || $o->member_size_type==4)
			return 2;
		// งานวัดจากเสื้อ
		else if($o->member_size_type==5 || $o->member_size_type==6)
			return 1;
		return 0;
	}

	public function shoulder($o){
		$mtype = $this->get_measure_type($o);
		$rtn = myNumberFormat($o->shoulder);
		if($mtype==1)
			$rtn .= ' x '.myNumberFormat($o->shoulder_center).' x '.myNumberFormat($o->shoulder_side);
		return $rtn;
	}

	public function chest($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return myNumberFormat($o->chest_frontpiece).' x '.myNumberFormat($o->chest_backpiece);
		else if($mtype==2)
			return myNumberFormat($o->chest).' + '.myNumberFormat($o->chest_buffer);
		return '';
	}

	public function waist($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return myNumberFormat($o->waist_frontpiece).' x '.myNumberFormat($o->waist_backpiece);
		else if($mtype==2)
			return myNumberFormat($o->waist).' + '.myNumberFormat($o->waist_buffer);
		return '';
	}

	public function hips($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return myNumberFormat($o->hips_frontpiece).' x '.myNumberFormat($o->hips_backpiece);
		else if($mtype==2)
			return myNumberFormat($o->hips).' + '.myNumberFormat($o->hips_buffer);
		return '';
	}

	public function length($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return myNumberFormat($o->length_in_front).' x '.myNumberFormat($o->length_in_back);
		else if($mtype==2)
			return myNumberFormat($o->length_in_front);
		return '';
	}

	public function biceps($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return myNumberFormat($o->biceps);
		else if($mtype==2)
			return myNumberFormat($o->biceps).' + '.myNumberFormat($o->biceps_buffer);;
		return '';
	}

	public function elbow($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return myNumberFormat($o->elbow);
		else if($mtype==2)
			return myNumberFormat($o->elbow).' + '.myNumberFormat($o->elbow_buffer);;
		return '';
	}

	public function armhole($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return myNumberFormat($o->armhole);
		else if($mtype==2)
			return myNumberFormat($o->armhole).' + '.myNumberFormat($o->armhole_buffer);;
		return '';
	}

}