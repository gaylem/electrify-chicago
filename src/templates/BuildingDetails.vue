<page-query>
query ($id: ID!) {
  building(id: $id) {
    Address
    ElectricityUse
    GHGIntensity
    GrossFloorArea
    NaturalGasUse
    NumberOfBuildings
    PrimaryPropertyType
    PropertyName
    TotalGHGEmissions
    YearBuilt
    Wards
    ZIPCode
  }
}
</page-query>

<template>
  <DefaultLayout>
    <div>
      <h1 v-html="$page.building.PropertyName" />

      <div class="building-details">
        <h2>Building Info</h2>

        <dl>
          <div>
            <dt>Full Address</dt>
            <dd>{{ $page.building.Address }}, Chicago IL, {{ $page.building.ZIPCode }}</dd>
          </div>

          <div>
            <dt>Square Footage</dt>
            <dd>{{ $page.building.GrossFloorArea }} sq. feet</dd>
          </div>

          <div>
            <dt>Built</dt>
            <dd>{{ $page.building.YearBuilt }}</dd>
          </div>

          <div>
            <dt>Primary Property Type</dt>
            <dd>{{ $page.building.PrimaryPropertyType }}</dd>
          </div>

          <!-- Only show building count if set and > 1, most are 1 -->
          <div v-if="$page.building.NumberOfBuildings && $page.building.NumberOfBuildings > 1">
            <dt>Building Count</dt>
            <dd>{{ $page.building.NumberOfBuildings }}</dd>
          </div>

          <div>
            <dt>Ward</dt>
            <dd>{{ $page.building.Wards }}</dd>
          </div>
        </dl>
      </div>

      <h2>Emissions Information</h2>

      <dl>
        <div>
          <dt>GHG Intensity</dt>
          <dd>
            <template v-if="$page.building.GHGIntensity">
              {{ $page.building.GHGIntensity }} kg CO<sub>2</sub>/sqft
            </template>
            <template v-else>?</template>
          </dd>
        </div>

        <div>
          <dt>Total GHG Emissions</dt>
          <dd>
            <template v-if="$page.building.TotalGHGEmissions">
              {{ $page.building.TotalGHGEmissions }} metric tons CO<sub>2</sub>
            </template>
            <template v-else>?</template>
          </dd>
        </div>

        <div>
          <dt>Natural Gas Use</dt>
          <dd>
            <template v-if="$page.building.NaturalGasUse">
              {{ $page.building.NaturalGasUse }} kBtu
            </template>
            <template v-else>?</template>
          </dd>
        </div>

        <div>
          <dt>Electricity Use</dt>
          <dd>
            <template v-if="$page.building.ElectricityUse">
              {{ $page.building.ElectricityUse }} kBtu
            </template>
            <template v-else>?</template>
          </dd>
        </div>
      </dl>

      <p class="footnote">
        Data Source:
        <!-- eslint-disable-next-line max-len -->
        <a href="https://data.cityofchicago.org/Environment-Sustainable-Development/Chicago-Energy-Benchmarking-Covered-Buildings/g5i5-yz37"
          target="_blank" rel="noopener noreferrer">
          Chicago Energy Benchmarking - Covered Buildings (opens in a new tab)
        </a>
      </p>
    </div>
  </DefaultLayout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.building.PropertyName,
    };
  },
};
</script>

<style lang="scss">
.building-details {
  background: #ededed;
  border-radius: 0.5rem;
  padding: 0.25rem 2rem 0.5rem;
}

dl {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>