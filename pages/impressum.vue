<template>
  <div>
    <headAndC :divider="true">
      <template #title>
        Angaben gemäß § 5 TMG:
      </template>
      <div>
        Model United Nations Initiative Karlsruhe e. V.<br>
        c/o Paul Mauersberg<br>
        Sophienstraße 55<br>
        76133 Karlsruhe
      </div>
    </headAndC>

    <headAndC :divider="true">
      <template #title>
        Vertreten durch:
      </template>
      <div>
        Okello Leon Patrick<br>
        Heidelberg Franziska <br>
        Ramakumar Varshitha 
      </div>
    </headAndC>

    <headAndC :divider="true">
      <template #title>
        E-Mail:
      </template>
      <div>
        <a href="mailto:vorstand@munika.org">vorstand@munika.org</a>
      </div>
    </headAndC>

    <headAndC :divider="true">
      <template #title>
        Registereintrag:
      </template>
      <div>
        Eintragung im Vereinsregister.<br>
        Registergericht: Amtsgericht Mannheim<br>
        Registernummer: VR103388
      </div>
    </headAndC>

    <headAndC :divider="true">
      <template #title>
        Haftungsausschluss (Disclaimer)
      </template>
      <div>
        <strong>Haftung für Inhalte</strong><br>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br>
        <strong>Haftung für Links</strong><br>
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br><br>
        <strong>Urheberrecht</strong><br>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
      </div>
    </headAndC>
  </div>
</template>

<script setup lang="ts">
import headAndC from '~/components/headAndC.vue'
</script>