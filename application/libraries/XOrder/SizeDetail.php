<?php

class SizeDetail {

	public function get_measure_type($o){
		// งานวัดจากเสื้อ
		if($o->member_size_type==1 || $o->member_size_type==2 || $o->member_size_type==3 || $o->member_size_type==4)
			return 1;
		// งานวัดจากตัว
		else if($o->member_size_type==5 || $o->member_size_type==6)
			return 2;
		return 0;
	}

	public function shoulder($o){
		$mtype = $this->get_measure_type($o);
		$rtn = number_format($o->collar);
		if($mtype==1)
			$rtn .= ' x '.number_format($o->shoulder_center).' x '.number_format($o->shoulder_side);
		return $rtn;
	}

	public function chest($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return number_format($o->chest_frontpiece).' x '.number_format($o->chest_backpiece);
		else if($mtype==2)
			return number_format($o->chest).' + '.number_format($o->chest_buffer);
		return '';
	}

	public function waist($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return number_format($o->waist_frontpiece).' x '.number_format($o->waist_backpiece);
		else if($mtype==2)
			return number_format($o->waist).' + '.number_format($o->waist_buffer);
		return '';
	}

	public function hips($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return number_format($o->hips_frontpiece).' x '.number_format($o->hips_backpiece);
		else if($mtype==2)
			return number_format($o->hips).' + '.number_format($o->hips_buffer);
		return '';
	}

	public function length($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return number_format($o->length_in_front).' x '.number_format($o->length_in_back);
		else if($mtype==2)
			return number_format($o->length_in_front);
		return '';
	}

	public function biceps($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return number_format($o->biceps);
		else if($mtype==2)
			return number_format($o->biceps).' + '.number_format($o->biceps_buffer);;
		return '';
	}

	public function elbow($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return number_format($o->elbow);
		else if($mtype==2)
			return number_format($o->elbow).' + '.number_format($o->elbow_buffer);;
		return '';
	}

	public function armhole($o){
		$mtype = $this->get_measure_type($o);
		if($mtype==1)
			return number_format($o->armhole);
		else if($mtype==2)
			return number_format($o->armhole).' + '.number_format($o->armhole_buffer);;
		return '';
	}

}