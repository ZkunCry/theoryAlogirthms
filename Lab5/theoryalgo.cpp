#include <iostream>
#include <map>
#include <fstream>
#include <string>
#include <vector>
std::ofstream out;

 int countLines(const char* fileName) {
    std::ifstream in(fileName);
    int count = 0;
    char buffer[10000];
    while (!in.eof()) {
        count++;
        in.getline(buffer, 1000);
    }
    in.close();
    return count;
}

std::string getLexemLeft(std::string src) {
    auto assign = src.find('=');
    src = src.substr(0, assign + 1);
    src.replace(assign, src.find('='), "");
    src.erase(std::remove_if(src.begin(), src.end(), ::isspace), src.end());
    return src;
}

std::string findFreeFile(std::map<std::string, std::string>src) {
    std::string result = "out1.txt";
    int countOut1=0,countOut2 = 0,countOut3 = 0;
    for (const auto& element : src)
    {
        if (element.second == "out1.txt")
        {
            result = "out2.txt";
            
            continue;
        }
        else if (element.second == "out2.txt") {
         
            result = "out3.txt";
            continue;
        }
        else if (element.second =="out3.txt") {
           
            result = "out1.txt";
            continue;
        }
    }
    return result;
}
void writeOnFile(const std::string src,const std::string text) {
    out.open(src,std::ios::app);
    out << text<<std::endl;
}
int main()
{
    std::map<std::string, std::string> result;
    std::map<std::string, std::string> resultForFiles;

    std::string nameFiles[3] = {
        "out1.txt",
        "out2.txt",
        "out3.txt"
    };

    const int count = countLines("pn.txt");
 
    std::string linesTemp;
    std::vector<std::string> *lines = new std::vector<std::string>[count];
    std::vector<std::string> vectorLexems;
    std::ifstream in("pn.txt");
    std::ofstream out1("out1.txt",std::ios::out);
    std::ofstream out2("out2.txt", std::ios::out);
    std::ofstream out3("out3.txt", std::ios::out);


    if (in.is_open())
    {
        for (int i = 0; i < count; i++)
        {
            std::getline(in, linesTemp);
            if (linesTemp.find("if") !=std::string::npos ||linesTemp.find("print")!=std::string::npos)
                continue;
            lines->push_back(linesTemp);
            auto assign = linesTemp.find('=');
     
            linesTemp = linesTemp.substr(0, assign+1);
            linesTemp.replace(assign, linesTemp.find('='),"");
            linesTemp.erase(std::remove_if(linesTemp.begin(), linesTemp.end(), ::isspace), linesTemp.end());
            vectorLexems.push_back(linesTemp);
  
        }

    }
    //result.insert(std::pair<std::string, std::string>(vectorLexems[0], nameFiles[0]));
    //resultForFiles.insert(std::pair<std::string, std::string>(lines->at(0), nameFiles[0]));

    for (int i = 0; i < lines->size(); i++) {
        bool isContain = false;
        std::string lexem = vectorLexems[i];
        for (int j = i+1; j < lines->size(); j++) {
            if (lines->at(j).find(lexem) != std::string::npos) {
                if (result.count(lexem))
                {
                    result.insert(std::pair<std::string, std::string>(getLexemLeft(lines->at(j)), result[lexem]));
                    resultForFiles.insert(std::pair<std::string, std::string>(lines->at(j), result[lexem]));
                    
                }
                else {
                    std::string t1 = findFreeFile(result);
                    if (result.count(vectorLexems[j]))
                    {
                        result.insert(std::pair<std::string, std::string>(lexem, result[vectorLexems[j]]));
                        resultForFiles.insert(std::pair<std::string, std::string>(lines->at(i), result[vectorLexems[j]]));
                    }
                    else
                    {
                        result.insert(std::pair<std::string, std::string>(lexem, t1));
                        resultForFiles.insert(std::pair<std::string, std::string>(lines->at(i), t1));
                    }
                    result.insert(std::pair<std::string, std::string>(getLexemLeft(lines->at(j)),result[lexem]));
                    resultForFiles.insert(std::pair<std::string, std::string>(lines->at(j), result[lexem]));


                }
                isContain = true;
            }
            
            /*else
            {
                std::string t1 = findFreeFile(result);
                result.insert(std::pair<std::string, std::string>(lexem, t1));
                resultForFiles.insert(std::pair<std::string, std::string>(lines->at(i), t1));
            }*/
        }
        if (!isContain)
        {
            for (const auto& element : result)
            {
                int j = 0;
                if (lines->at(j).find(lexem) !=std::string::npos)
                {
                    result.insert(std::pair<std::string, std::string>(lexem, element.second));
                    resultForFiles.insert(std::pair<std::string, std::string>(lines->at(j), element.second));
                }
                j++;
            }
            result.insert(std::pair<std::string, std::string>(lexem, "out3.txt"));
            resultForFiles.insert(std::pair<std::string, std::string>(lines->at(i), "out3.txt"));
        }
    }

 
  for (const auto& element : resultForFiles)
  {
      if(element.second =="out1.txt")
          out1 << element.first << std::endl;
      else if(element.second == "out2.txt")
          out2 << element.first << std::endl;
      else
          out3 << element.first << std::endl;
  }
  out.close();
}

