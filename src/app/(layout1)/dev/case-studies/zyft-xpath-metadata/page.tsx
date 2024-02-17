import BlogContent from '@/components/BlogContent/BlogContent'
import Link from 'next/link'

export default function Page() {
  return (
    <BlogContent>
      <h2>Case Study</h2>
      <h1>
        Zyft: Snapshot Testing for XPath & Metadata Logic that Needs to Work
        across 40k+ Domains
      </h1>
      <p>
        The{' '}
        <Link href='https://zyft.com/' target='_blank'>
          Zyft Chrome and Safari extension
        </Link>{' '}
        needs to reliably detemine if web pages from over 40,000 retailers
        contain a valid product. This is done by examining the page's metadata.
        For domains that don't contain useful metadata, Zyft uses pre-defined
        XPaths.
      </p>
      <h3>Challenges:</h3>
      <ul>
        <li>
          It's wild how differently every web page's metadata is named and
          structured.
        </li>
        <li>
          A small change to improve one domain may negatively affect thousands
          of others.
        </li>
        <li>XPaths are brittle and can break when the page's HTML changes.</li>
        <li>
          You could never write enough unit tests to confidently make changes to
          the logic.
        </li>
      </ul>

      <h3>Solution:</h3>
      <p>
        I wrote a script that takes a list of domains, saves the HTML's, runs
        the existing metadata & xpath logic, and saves the results. Running the
        tests to see if the new results match the previous allows me to safely
        make changes.
      </p>
      <p>
        Every time we stumble across a problematic new domain, I can run a
        script to add it, then test it individually or all domains at once.
      </p>
      <h3>Result:</h3>
      <p>
        Since implementing snapshot testing, we've been able to improve the
        metadata to the point where we rarely need to rely on XPaths.
      </p>
    </BlogContent>
  )
}
