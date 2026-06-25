const fs = require("fs");
const p = "C:/Users/alienware/Documents/petvitals/src/data/toxicity.ts";
let c = fs.readFileSync(p, "utf8");
function qi(id, name, aliases, cat, sd, sc, rl, desc, sa, ben, sym, act, tags) {
  let s = '  {\n';
  s += '    id: "' + id + '",\n';
  s += '    name: "' + name + '",\n';
  s += '    aliases: ["' + aliases.join('", "') + '"],\n';
  s += '    category: "' + cat + '",\n';
  s += '    safeForDog: ' + sd + ',\n';
  s += '    safeForCat: ' + sc + ',\n';
  s += '    riskLevel: "' + rl + '",\n';
  s += '    description: "' + desc + '",\n';
  s += '    safeAmount: "' + sa + '",\n';
  s += '    benefits: "' + ben + '",\n';
  s += '    symptoms: "' + sym + '",\n';
  s += '    action: "' + act + '",\n';
  s += '    tags: ["' + tags.join('", "') + '"],\n';
  s += '  },';
  return s;
}
const items = [
qi("cheddar-bay","Cheddar Bay Biscuits",["cheddar bay biscuit","red lobster biscuit"],"human-food",false,false,"caution","Contains garlic and onion powder which are toxic. High fat and salt.","","","Digestive upset, allium toxicity risk","Avoid. Contains garlic and onion.",["human-food","garlic","high-fat","caution"]),
qi("margarine","Margarine",["margarine","butter substitute"],"human-food",false,false,"caution","Margarine is high in unhealthy fats. Can cause pancreatitis.","","","Digestive upset, pancreatitis risk","Avoid feeding.",["high-fat","processed","caution"]),
qi("celery-salt","Celery Salt",["celery salt","celery seasoning"],"seasonings",false,false,"toxic","Celery salt is very high in sodium.","","","Sodium poisoning: vomiting, excessive thirst, tremors, seizures","Provide fresh water. Contact vet if ingested.",["seasoning","high-sodium","toxic"]),
qi("ketogenic-food","Ketogenic Pet Food",["keto diet","keto pet food","high fat diet"],"human-food",false,false,"caution","Ketogenic diets for pets need veterinary supervision.","","","Can cause pancreatitis if too high in fat","Consult vet before starting keto diet for your pet.",["diet","high-fat","caution","vet-advised"]),
qi("cocoa-mulch","Cocoa Mulch",["cocoa mulch","cocoa bean mulch","chocolate mulch"],"household",false,false,"danger","Cocoa mulch contains theobromine like chocolate. Highly toxic.","","","Vomiting, restlessness, rapid heart rate, seizures","Emergency. Contact vet immediately.",["toxic","emergency","household","garden","theobromine"]),
];
const idx = c.lastIndexOf("];", c.indexOf("export const toxicityCategories"));
c = c.substring(0, idx) + "\n" + items.join("\n") + "\n" + c.substring(idx);
fs.writeFileSync(p, c, "utf8");
console.log("Added", items.length, "items");
