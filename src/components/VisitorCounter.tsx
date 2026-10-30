import { useEffect, useState } from "react";
import { Eye, Globe } from "lucide-react";

const NAMESPACE = "kmamspu-02";
const KEY = "site-visits";
const SESSION_FLAG = "kmamspu_visit_counted";

type CountryInfo = { name: string; flag: string };

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [country, setCountry] = useState<CountryInfo | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_FLAG);
    const endpoint = alreadyCounted
      ? `https://abacus.jasoncameron.dev/get/${NAMESPACE}/${KEY}`
      : `https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${KEY}`;

    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.value === "number") {
          setCount(data.value);
          if (!alreadyCounted) sessionStorage.setItem(SESSION_FLAG, "1");
        }
      })
      .catch(() => {});

    // Cache country in session to avoid extra hits
    const cached = sessionStorage.getItem("kmamspu_country");
    if (cached) {
      try {
        const parsedCountry = JSON.parse(cached) as CountryInfo;
        if (parsedCountry && typeof parsedCountry.name === "string" && typeof parsedCountry.flag === "string") {
          setCountry(parsedCountry);
        }
      } catch (error) {
        console.warn("Failed to parse cached country info", error);
      }
    } else {
      fetch("https://ipapi.co/json/")
        .then((r) => r.json())
        .then((data) => {
          if (data?.country_name && data?.country_code) {
            const code: string = data.country_code.toUpperCase();
            const flag = String.fromCodePoint(
              ...[...code].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0))
            );
            const info = { name: data.country_name as string, flag };
            setCountry(info);
            sessionStorage.setItem("kmamspu_country", JSON.stringify(info));
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-3 text-sm text-foreground/70">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-sky-400" />
        <span>Jumlah pelawat:</span>
        <span className="font-semibold text-foreground tabular-nums">
          {count === null ? "…" : count.toLocaleString("ms-MY")}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-sky-400" />
        <span>Anda dari:</span>
        <span className="font-semibold text-foreground">
          {country ? (
            <>
              <span className="mr-1">{country.flag}</span>
              {country.name}
            </>
          ) : (
            "…"
          )}
        </span>
      </div>
    </div>
  );
};

export default VisitorCounter;
