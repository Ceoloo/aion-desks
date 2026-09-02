import { BuyButton } from "@/components/BuyButton";

export default function HomePage() {
  return (
    <>
      <header className="top">
        <div className="wrap inner">
          <div className="brand">AION Desks</div>
          <nav>
            <a href="#desks">Desks</a>
            <a href="#faq">FAQ</a>
            <a href="#buy">Buy</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Digital products · drafts only</p>
          <h1>A desk that writes. You still hit send.</h1>
          <p className="lede">
            Two operating packs. One for owners who need a chief of staff. One for
            anyone who wants a calmer week. Neither one mails, collects, or becomes
            a second CRM.
          </p>
          <div className="hero-actions">
            <a className="btn gold" href="#buy">
              Choose a desk
            </a>
            <a className="btn ghost" href="#faq">
              It does not send email
            </a>
          </div>
        </div>
      </section>

      <section className="band" id="desks">
        <div className="wrap">
          <p className="eyebrow">Hard stops</p>
          <h2>Built to stay on your side of the send button.</h2>
          <div className="proofs">
            <div className="proof">
              <strong>Draft-only follow-up</strong>
              Replies land in drafts. You review, edit, and send from your own client.
            </div>
            <div className="proof">
              <strong>Never auto-send</strong>
              No batch send, no send-later engine, no silent delivery while you sleep.
            </div>
            <div className="proof">
              <strong>Not a CRM</strong>
              Logs and drafts, not a pipeline, not a harvested contact warehouse.
            </div>
          </div>
        </div>
      </section>

      <section id="buy">
        <div className="wrap columns">
          <article className="card">
            <p className="eyebrow">SKU 1 · Owners</p>
            <h2>Operator Desk</h2>
            <p className="who">For one-person companies that still need a chief of staff.</p>
            <ul>
              <li>Chief of Staff seat: morning pulse and 4pm decision pack.</li>
              <li>Follow-Up Engine: drafts only. Never auto-send.</li>
              <li>Calendar + inbox in draft/hold mode. You confirm everything outbound.</li>
              <li>Written charter, routing, connectors, routines, walkthrough.</li>
            </ul>
            <div className="buy-stack">
              <div className="price-row">
                <div>
                  <div className="price">
                    $47 <span>template</span>
                  </div>
                  <p className="fine">Operating pack you drop into your workspace.</p>
                </div>
              </div>
              <BuyButton sku="operator_template">Buy template · $47</BuyButton>
              <div className="price-row">
                <div>
                  <div className="price">
                    $179 <span>template + 45-min install</span>
                  </div>
                  <p className="fine">Same pack, plus a live setup so scopes stay draft-only.</p>
                </div>
              </div>
              <BuyButton sku="operator_install" variant="ink">
                Buy with 45-min install · $179
              </BuyButton>
            </div>
          </article>

          <article className="card">
            <p className="eyebrow">SKU 2 · Everyday</p>
            <h2>Everyday Desk</h2>
            <p className="who">For people who want their week handled — without a company stack.</p>
            <ul>
              <li>Calendar holds you confirm before anyone else is invited.</li>
              <li>Inbox drafts you send yourself.</li>
              <li>Weekly brief: what moved, what is waiting, what can stay quiet.</li>
              <li>No CRM. No pipeline. No contact database.</li>
            </ul>
            <div className="buy-stack">
              <div className="price-row">
                <div>
                  <div className="price">
                    $39 <span>template</span>
                  </div>
                  <p className="fine">Pack for your own calendar, inbox, and notebook.</p>
                </div>
              </div>
              <BuyButton sku="everyday_template">Buy template · $39</BuyButton>
              <div className="price-row">
                <div>
                  <div className="price">
                    $149 <span>template + install</span>
                  </div>
                  <p className="fine">Guided install so the desk never grows a CRM.</p>
                </div>
              </div>
              <BuyButton sku="everyday_install" variant="ink">
                Buy with install · $149
              </BuyButton>
            </div>
          </article>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="wrap">
          <p className="eyebrow">FAQ</p>
          <h2>Straight answers.</h2>
          <details open>
            <summary>Does this send email for me?</summary>
            <p>
              No. It does not send email for you. Operator Desk and Everyday Desk
              write drafts. You hit send in your own mail client. There is no auto-send
              path.
            </p>
          </details>
          <details>
            <summary>What is in the Operator Desk pack?</summary>
            <p>
              A charter for the Chief of Staff and Follow-Up Engine, routing rules,
              connector steps (calendar, draft-only inbox, notebook), weekday routines,
              and a short walkthrough. Install is a 45-minute live pass to lock scopes.
            </p>
          </details>
          <details>
            <summary>What is in the Everyday Desk pack?</summary>
            <p>
              Calendar practice, inbox-draft practice, and a weekly brief template.
              It is not a CRM and will not become one.
            </p>
          </details>
          <details>
            <summary>Will you collect payments or chase invoices?</summary>
            <p>
              No. These desks do not collect. Stripe on this site is only for buying
              the packs themselves.
            </p>
          </details>
          <details>
            <summary>What do I download after checkout?</summary>
            <p>
              A zip for the desk you bought. After payment, the success page links the
              pack. Install SKUs include the same template plus a scheduling note for
              the live session.
            </p>
          </details>
        </div>
      </section>

      <footer className="wrap">
        <span>AION Desks · draft only</span>
        <span>You send. The desk drafts.</span>
      </footer>
    </>
  );
}
