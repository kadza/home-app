<script>
  import { temperature } from "../home-store";
import Thermometer from "svelte-material-icons/Thermometer.svelte";
  </script>

<style>
  .temp{
  color: #fff;
  font-weight: 400;
  display: flex;
  align-items: center;
}
  </style>

<div class="temp">
  <Thermometer color={'white'} />
<span>{$temperature} °C</span>

</div>