// Response object for GET /movies
// https://docs.opendota.com/#tag/movies%2Fpaths%2F~1movies%2Fget
export interface Movie extends ApiResponse {
  id: number
  name: string
  localized_name: string
  primary_attr: string
  attack_type: string
  roles: string[]
  img: string
  icon: string
  base_health: number
  base_health_regen: number
  base_mana: number
  base_mana_regen: number
  base_armor: number
  base_mr: number
  base_attack_min: number
  base_attack_max: number
  base_str: number
  base_agi: number
  base_int: number
  str_gain: number
  agi_gain: number
  int_gain: number
  attack_range: number
  projectile_speed: number
  attack_rate: number
  move_speed: number
  turn_rate: number
  cm_enabled: boolean
  legs: number
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = Record<string, any>
