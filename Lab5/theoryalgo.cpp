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
    std::string result = "out3.txt";
    for (const auto& element : src)
    {
        if (element.second == "out1.txt")
            result = "out2.txt";
        else if (element.second == "out2.txt") {
            result = "out3.txt";
        }
        else {
            result = "out1.txt";
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

    if (in.is_open())
    {
        for (int i = 0; i < count; i++)
        {
            std::getline(in, linesTemp);
            lines->push_back(linesTemp);
            auto assign = linesTemp.find('=');
     
            linesTemp = linesTemp.substr(0, assign+1);
            linesTemp.replace(assign, linesTemp.find('='),"");
            linesTemp.erase(std::remove_if(linesTemp.begin(), linesTemp.end(), ::isspace), linesTemp.end());
            vectorLexems.push_back(linesTemp);
  
        }

    }
    result.insert(std::pair<std::string, std::string>(vectorLexems[0], nameFiles[0]));
    resultForFiles.insert(std::pair<std::string, std::string>(lines->at(0), nameFiles[0]));

    for (int i = 0; i < lines->size(); i++) {
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
                    result.insert(std::pair<std::string, std::string>(lexem, t1));
                    result.insert(std::pair<std::string, std::string>(getLexemLeft(lines->at(j)),result[lexem]));
                    resultForFiles.insert(std::pair<std::string, std::string>(lines->at(i), t1));
                    resultForFiles.insert(std::pair<std::string, std::string>(lines->at(j), result[lexem]));


                }
            }
            else
            {
                std::string t1 = findFreeFile(result);
                result.insert(std::pair<std::string, std::string>(lexem, t1));
                resultForFiles.insert(std::pair<std::string, std::string>(lines->at(i), t1));
            }
        }
    }
  for (const auto& element : resultForFiles)
  {
        writeOnFile(element.second, element.first);
        std::cout << element.first << "          File:" << element.second << std::endl;
  }
  out.close();
}

