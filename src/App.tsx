import React, { useEffect, useState } from "react";
import { getForm } from "./config/Service";

const Content = ({
  onSubmit,
  formData,
  onChange,
  tag,
  html,
  children: data,
  ...dist
}: any) => {
  const [newDist, setNewDist]: any = useState({});

  useEffect(() => {
    let _newDist: any = {};

    Object.keys(dist).map((prop: any) => {
      let newProp = prop
        .replace("class", "className")
        .replace("for", "htmlFor");
      _newDist[newProp] = dist[prop];
    });

    if (tag === "input" || tag === "select") {
      _newDist["onChange"] = onChange;
    } else if (tag === "form") {
      _newDist["onSubmit"] = onSubmit;
    }

    setNewDist(_newDist);
  }, [formData]);

  return React.createElement(
    tag,
    newDist,
    tag !== "input"
      ? [
          html ? <span key={Math.random() * 10}>{html}</span> : null,
          data
            ? data.map((item: any, index: any) => {
                if (item.tag === "option") {
                  return <option key={index}>{item.html}</option>;
                } else {
                  return Content({
                    key: index,
                    ...item,
                    onSubmit: onSubmit,
                    formData: formData,
                    onChange: onChange,
                    html: item?.html?.trim().replace(/\r?\n|\r/gm, ""),
                  });
                }
              })
            : null,
        ]
      : null
  );
};

const Body = ({ item }: any) => {
  const [data, setData]: any = useState();

  function onChange(e: any) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  console.log(data);
  return (
    <Content
      onSubmit={(e: any) => {
        e.preventDefault();
        console.log("Submit Data", data);
      }}
      onChange={onChange}
      formData={data}
      {...item}
    />
  );
};

function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const init = async () => {
      const [data, error]: any = await getForm();
      setItem(data.forms[0].bilgiler.formjson.children[0].children[0]);
      if (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  return <>{item ? <Body key={"1"} item={item} /> : <></>}</>;
}

export default App;
