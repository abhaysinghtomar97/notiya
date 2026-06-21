import Link from "next/link";

export default function Breadcrumb({
  university,
  course,
  year,
  slug
}) {

  return (

    <div className="mb-5 flex gap-2">

      <Link href="/">
        Home
      </Link>

      /

      <Link href={`/study-material/${university}`}>
        {university}
      </Link>

      /

      <Link href={`/study-material/${university}/${course}`}>
        {course}
      </Link>

      /

      <Link href={`/study-material/${university}/${course}/${year}`}>
        {year}
      </Link>
      console.log("alug: ", slug)

      {slug.map((item) => (

        <span key={item}>

          / {item}

        </span>

      ))}

    </div>

  );
}