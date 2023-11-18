<?php
use Illuminate\Support\Facades\DB;

if (!function_exists('generateInitial')) {
    function generateInitial(string $name): string
    {
        $words = explode(' ', $name);
        if (count($words) >= 2) {
            return mb_strtoupper(
                mb_substr($words[0], 0, 1, 'UTF-8') .
                mb_substr(end($words), 0, 1, 'UTF-8'),
                'UTF-8'
            );
        }
        return makeInitialsFromSingleWord($name);
    }
}

if (!function_exists('makeInitialsFromSingleWord')) {
    function makeInitialsFromSingleWord(string $name): string
    {
        preg_match_all('#([A-Z]+)#', $name, $capitals);
        if (count($capitals[1]) >= 2) {
            return mb_substr(implode('', $capitals[1]), 0, 2, 'UTF-8');
        }
        return mb_strtoupper(mb_substr($name, 0, 2, 'UTF-8'), 'UTF-8');
    }
}

if (!function_exists('initials')) {
    function initials($str) : string
    {
        $ret = '';
        foreach (explode(' ', $str) as $word)
            $ret .= strtoupper($word[0]);
        return $ret;
    }
}

if (!function_exists('generateUserCode')) {
    function generateUserCode(string $initial) {
        $six_digit_random_number = random_int(100000, 999999);
        $concatCode = $initial . $six_digit_random_number;
        $exists = DB::table('users')->where('user_code', $concatCode)->exists();
        if($exists) {
            generateUserCode($initial);
        } 
        else {
            return $concatCode;
        }
    }
}

if (!function_exists('get_active_statuses')) {
    function get_active_statuses($customer_id, $customer_type, $source_id, $customer_status)
    {
        $list_statuses = DB::table('statuses')->where('type', 'listing_lead')->whereNull('deleted_at')->orderBy('id', "ASC")->get();
        $return_result = [];
        $checkInitialExists = checkIfEntityHasActivity($source_id, $customer_type, 'Initial Call');
        if (!$checkInitialExists) {
            foreach ($list_statuses as $index => $temp) {
                $return_result[$index] = (object) [
                    'key' => $temp->id,
                    'label' => $temp->name,
                    'id' => $temp->id,
                    'name' => $temp->name,
                    'disabled' => true
                ];
            }
        } else {
            foreach ($list_statuses as $index => $temp) {
                $return_result[$index] = (object) [
                    'key' => $temp->id,
                    'label' => $temp->name,
                    'id' => $temp->id,
                    'name' => $temp->name,
                    'disabled' => false
                ];
            }
        }

        if ($customer_status == 'Prospect') {
            unset($return_result[0]);
            if ($customer_type == 'seller' || $customer_type == 'leaser' || $customer_type == 'tenant') {
                unset($return_result[1]);
            }
            unset($return_result[4]);
        } 
        else if ($customer_status == 'Potential') {
            unset($return_result[0]);
            unset($return_result[1]);
        } 
        else if ($customer_status == 'Interested') {
            unset($return_result[0]);
            unset($return_result[1]);
            unset($return_result[2]);
        } 
        else if ($customer_status == 'Not Interested') {
            unset($return_result[0]);
            unset($return_result[1]);
            unset($return_result[3]);
        }
        else if ($customer_status == 'Deal') {
            unset($return_result[0]);
            unset($return_result[1]);
            unset($return_result[2]);
            unset($return_result[3]);
            unset($return_result[4]);
        }

        sort($return_result);
        return $return_result;

    }
}

if (!function_exists('get_active_activities')) {
    function get_active_activities($customer_id, $customer_type, $source_id)
    {
        $list_activities = DB::table('activity_types')->orderBy('id', "ASC")->get();
        $return_result = [];
        $checkInitialExists = checkIfEntityHasActivity($source_id, $customer_type, 'Initial Call');

        if (!$checkInitialExists) {
            foreach ($list_activities as $index => $temp) {
                if ($temp->id == 1) {
                    $return_result[$index] = (object) [
                        'id' => $temp->id,
                        'name' => $temp->name,
                        'disabled' => false
                    ];
                } else {
                    $return_result[$index] = (object) [
                        'id' => $temp->id,
                        'name' => $temp->name,
                        'disabled' => true
                    ];
                }
            }
        } else {
            foreach ($list_activities as $index => $temp) {
                if ($temp->id == 1) {
                    $return_result[$index] = (object) [
                        'id' => $temp->id,
                        'name' => $temp->name,
                        'disabled' => true
                    ];
                } else {
                    $return_result[$index] = (object) [
                        'id' => $temp->id,
                        'name' => $temp->name,
                        'disabled' => false
                    ];
                }
            }
        }

        sort($return_result);
        return $return_result;
    }
}

if (!function_exists('checkIfEntityHasActivity')) {
    /**
     * @param $entity_id
     * @param $activity_name
     * @return mixed
     */
    function checkIfEntityHasActivity($entity_id, $entity_type, $activity_name)
    {
        $query = DB::select("SELECT count(1) as total_count
                FROM customer_activities ca
                INNER JOIN activity_types a ON ca.activity_id = a.id
                WHERE a.name = ? AND ca.customer_type = ? AND ca.source_id = ? ;", [$activity_name, $entity_type, $entity_id]);

        if ($query && count($query) > 0) {
            return ($query[0]->total_count > 0 ? true : false);
        }
    }
}

if (!function_exists('time_elapsed_string')) {
    function time_elapsed_string($datetime, $full = false)
    {
        $now = new DateTime;
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);
        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;
        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }
        if (!$full) {
            $string = array_slice($string, 0, 1);
        }
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }
}

if (!function_exists('time_remaining_string')) {
    function time_remaining_string($datetime, $full = false)
    {
        $now = new DateTime;
        $next = new DateTime($datetime);
        $diff = $now->diff($next);

        if ($diff->days > 1) {
            return $diff->days . ' days';
        } else {
            return $diff->days . ' day';
        }
    }
}