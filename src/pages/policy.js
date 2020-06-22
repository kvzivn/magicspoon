import React from 'react'
import { Container } from '~/utils/styles'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  margin: 2rem auto 6rem;
  padding: 4rem;

  h1 {
    text-align: center;
    margin-bottom: 4rem;
  }
`

const Policy = () => (
  <Container>
    <Wrapper>
      <h1>Integritetspolicy, fraktinformation och returer</h1>

      <h4>Personuppgifter vi samlar in</h4>
      <p>När du besöker webbplatsen samlar vi automatiskt in viss information om din enhet, inklusive information om din webbläsare, IP-adress, tidszon och några av de cookies som är installerade på din enhet. När du surfar på webbplatsen samlar vi dessutom in information om de enskilda webbsidor eller produkter som du visar, vilka webbplatser eller söktermer som hänvisas till webbplatsen och information om hur du interagerar med webbplatsen. Vi hänvisar till denna automatiskt insamlade information som "enhetsinformation".
      <br /><br />
      Vi samlar in enhets information med hjälp av följande tekniker:
      <br />
      -"Cookies" är datafiler som placeras på din enhet eller dator och ofta innehåller en anonym unik identifierare. Mer information om cookies och hur du avaktiverar cookies finns på http://www.allaboutcookies.org.
      <br /><br />
      Dessutom när du gör ett köp eller försöker göra ett köp via webbplatsen samlar vi in viss information från dig, inklusive ditt namn, faktureringsadress, leveransadress, betalningsinformation, e-postadress och telefonnummer. Vi hänvisar till denna information som "beställningsinformation".
      <br /><br />
      När vi pratar om "personlig information" i denna integritetspolicy pratar vi både om enhetsinformation och beställningsinformation.</p>

      <h4>Hur använder vi dina personuppgifter?</h4>
      <p>Vi använder beställningsinformationen som vi samlar in i allmänhet för att uppfylla alla beställningar som görs via webbplatsen (inklusive behandling av din betalnings information, arrangering av frakt och för att förse dig med fakturor och/eller orderbekräftelser).</p>

      <h4>Retur</h4>
      <p>Vi erbjuder 14 dagars returrätt. Om 14 dagar har passerat sedan ditt köp kan vi tyvärr inte erbjuda dig en återbetalning eller utbyte.</p>

      <h4>Återbetalningar (om tillämpligt)</h4>
      <p>När din retur har mottagits och inspekterats kommer vi att skicka ett e-postmeddelande till dig för att meddela dig att vi har mottagit din returnerade produkt. Vi kommer också att meddela dig om godkännande eller avvisande av din återbetalning.
      Om du godkänns kommer din återbetalning att behandlas och en kredit kommer automatiskt att tillämpas på ditt konto eller den ursprungliga betalningsmetoden, inom ett visst antal dagar.</p>

      <h4>Frakt (Returer)</h4>
      <p>Du kommer att ansvara för att betala för dina egna fraktkostnader för att returnera din vara. Fraktkostnader återbetalas ej. Om du får en återbetalning kommer kostnaden för returfrakten att dras från din återbetalning. Beroende på var du bor, kan den tid det tar för din utbytta produkt för att nå dig, variera. Om du returnerar varor över 750 SEK, bör du överväga att använda en spårbar frakttjänst eller köpa frakt försäkring. Vi garanterar inte att vi kommer att få din returnerade produkt.</p>
    </Wrapper>
  </Container>
)

export default Policy

